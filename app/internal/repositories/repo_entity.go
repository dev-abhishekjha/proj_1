package repositories

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/models"
	"context"

	"bitbucket.org/fyscal/be-commons/pkg/clients/auditlog"
	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type RepositoryEntity struct {
	access *RepositoryAccess
}

type RepositoryEntityMethods interface {
	GetEntities(params *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Entity], error)
	GetEntityTransitions(params *utils.FilterAndPageParams) (*utils.PaginatedResult[models.EntityTransition], error)
	GetEntityMetrics(ctx context.Context, entityId int64, params *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.EntityMetric], error)
	CreateEntity(ctx context.Context, entity *models.Entity) (*models.Entity, error)
	UpdateEntity(ctx context.Context, entityID int64, updates map[string]interface{}) (*models.Entity, error)
	GetEntityByCode(ctx context.Context, code string) (*models.Entity, error)
	GetEntityById(ctx context.Context, entityID int64) (*models.Entity, error)
	GetEntityApis(entityID int64, params *utils.FilterAndPageParams) (*utils.PaginatedResult[models.EntityApi], error)
	SetEntityApis(ctx context.Context, entityID int64, apiIDs []int64) error
}

func NewRepositoryEntity(access *RepositoryAccess) RepositoryEntityMethods {
	return &RepositoryEntity{
		access: access,
	}
}

func (r *RepositoryEntity) GetEntities(params *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Entity], error) {
	query := r.access.Db.MasterDB.Model(&models.Entity{})

	return utils.PaginateWithSearchFilter(
		query,
		global_types.MapQueryProperties,
		params,
		[]*models.Entity{},
	)
}

func (r *RepositoryEntity) GetEntityTransitions(params *utils.FilterAndPageParams) (*utils.PaginatedResult[models.EntityTransition], error) {
	query := r.access.Db.MasterDB.Model(&models.EntityTransition{})

	return utils.PaginateWithSearchFilter(
		query,
		global_types.MapQueryTransitionProperties,
		params,
		[]*models.EntityTransition{},
	)
}

func (r *RepositoryEntity) GetEntityMetrics(ctx context.Context, entityId int64, params *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.EntityMetric], error) {
	logger := r.access.Logger.With(ctx)

	query := r.access.ClickHouseDb.DB.Model(&models.EntityMetric{}).Where("entity_id = ?", entityId)

	return utils.PaginateCursorWithSearchFilter(
		logger,
		query,
		params,
		[]*models.EntityMetric{},
	)
}

func (r *RepositoryEntity) CreateEntity(ctx context.Context, entity *models.Entity) (*models.Entity, error) {
	var (
		logger = r.access.Logger.With(ctx)
		db     = r.access.Db.MasterDB.WithContext(ctx)
	)

	err := db.Table(models.Entity{}.TableName()).Create(&entity).Error
	if err != nil {
		logger.Error("[CreateEntity] Failed to create entity: %v", err)
		return nil, err
	}

	auditlog.WithAdditionalAuditLogEntry(ctx, entity, string(global_types.EntityEntityType), string(global_types.EntityEventCategory), entity.ID)

	return entity, nil
}

func (r *RepositoryEntity) UpdateEntity(ctx context.Context, entityID int64, updates map[string]interface{}) (*models.Entity, error) {
	var (
		logger = r.access.Logger.With(ctx)
		db     = r.access.Db.MasterDB.WithContext(ctx)
		entity models.Entity
	)

	result := db.Model(&entity).
		Clauses(clause.Returning{}).
		Where("id = ?", entityID).
		Updates(updates)

	if result.Error != nil {
		logger.Error("[UpdateEntity] Failed to update entity: %v", result.Error)
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	auditlog.WithAdditionalAuditLogEntry(ctx, entity, string(global_types.EntityEntityType), string(global_types.EntityUpdateCategory), entityID)

	return &entity, nil
}

func (r *RepositoryEntity) GetEntityByCode(ctx context.Context, code string) (*models.Entity, error) {
	var (
		db     = r.access.Db.MasterDB.WithContext(ctx)
		entity models.Entity
	)

	err := db.Table(models.Entity{}.TableName()).Where("code = ?", code).First(&entity).Error
	if err != nil {
		return nil, err
	}

	return &entity, nil
}

func (r *RepositoryEntity) GetEntityById(ctx context.Context, entityID int64) (*models.Entity, error) {
	var (
		db     = r.access.Db.MasterDB.WithContext(ctx)
		entity models.Entity
	)

	err := db.Table(models.Entity{}.TableName()).Where("id = ?", entityID).First(&entity).Error
	if err != nil {
		return nil, err
	}

	return &entity, nil
}

func (r *RepositoryEntity) GetEntityApis(entityID int64, params *utils.FilterAndPageParams) (*utils.PaginatedResult[models.EntityApi], error) {
	var (
		total  int64
		target []*models.EntityApi
		offset = params.GetOffset()
		limit  = params.GetLimit()
	)

	query := r.access.Db.MasterDB.Model(&models.EntityApi{}).
		Preload("Api").
		Where("entity_id = ?", entityID)

	query = utils.ApplySearchFilters(global_types.MapQueryEntityApisProperties, params.QueryParamsMap, query)

	if err := query.Count(&total).Error; err != nil {
		return nil, err
	}

	query = utils.ApplySort(params.SortFields, query)
	result := query.
		Order("id DESC"). // Fallback sort since created_at does not exist
		Offset(offset).
		Limit(limit).
		Find(&target)

	if result.Error != nil {
		return nil, result.Error
	}

	return &utils.PaginatedResult[models.EntityApi]{
		Result:      target,
		CurrentPage: params.GetPage(),
		TotalPages:  params.GetTotalPages(total),
		TotalItems:  total,
		Limit:       limit,
	}, nil
}

func (r *RepositoryEntity) SetEntityApis(ctx context.Context, entityID int64, apiIDs []int64) error {
	var (
		logger = r.access.Logger.With(ctx)
		db     = r.access.Db.MasterDB.WithContext(ctx)
	)

	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("entity_id = ?", entityID).Delete(&models.EntityApi{}).Error; err != nil {
			logger.Error("[SetEntityApis] Failed to delete existing entity apis: %v", err)
			return err
		}

		if len(apiIDs) > 0 {
			var entityApis []models.EntityApi
			for _, apiID := range apiIDs {
				entityApis = append(entityApis, models.EntityApi{
					EntityID: entityID,
					ApiID:    apiID,
				})
			}
			if err := tx.Create(&entityApis).Error; err != nil {
				logger.Error("[SetEntityApis] Failed to create entity apis: %v", err)
				return err
			}
		}

		return nil
	})
}
