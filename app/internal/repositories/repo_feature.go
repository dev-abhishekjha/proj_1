package repositories

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/models"
	"context"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type RepositoryFeature struct {
	access *RepositoryAccess
}

type RepositoryFeatureMethods interface {
	GetAllFeatures(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Feature], error)
	GetFeatureInstances(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.FeatureInstance], error)
	GetFeatureMetrics(ctx context.Context, featureID int64, filterAndPageParams *utils.FilterAndPageParams) (*models.FeatureMetric, error)
	CreateFeature(ctx context.Context, feature *models.Feature) (*models.Feature, error)
	UpdateFeature(ctx context.Context, featureID int64, updates map[string]interface{}) (*models.Feature, error)
	GetFeatureByCode(ctx context.Context, code string) (*models.Feature, error)
	GetFeatureById(ctx context.Context, featureID int64) (*models.Feature, error)
}

func NewRepositoryFeature(access *RepositoryAccess) RepositoryFeatureMethods {
	return &RepositoryFeature{
		access: access,
	}
}

func (rf *RepositoryFeature) GetAllFeatures(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Feature], error) {
	resultModel := []*models.Feature{}

	query := rf.access.Db.SlaveDB.WithContext(ctx).Model(&models.Feature{})
	result, err := utils.PaginateWithSearchFilter(query, global_types.MapQueryToFeatureProperty, filterAndPageParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (rf *RepositoryFeature) GetFeatureInstances(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.FeatureInstance], error) {
	var (
		resultModel []*models.FeatureInstance
		logger      = rf.access.Logger.With(ctx)
	)

	query := rf.access.ClickHouseDb.GetDB().WithContext(ctx).Model(&models.FeatureInstance{})
	result, err := utils.PaginateCursorWithSearchFilter(logger, query, filterAndCursorParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (rf *RepositoryFeature) GetFeatureMetrics(ctx context.Context, featureID int64, filterAndPageParams *utils.FilterAndPageParams) (*models.FeatureMetric, error) {
	var metric models.FeatureMetric

	query := rf.access.ClickHouseDb.GetDB().WithContext(ctx).
		Model(&models.FeatureMetric{}).
		Where("feature_id = ?", featureID)

	query = utils.ApplySearchFilters(global_types.MapQueryToFeatureMetricProperty, filterAndPageParams.QueryParamsMap, query)

	err := query.Order("window_start DESC").Limit(1).Find(&metric).Error
	if err != nil {
		return nil, err
	}

	return &metric, nil
}

func (rf *RepositoryFeature) CreateFeature(ctx context.Context, feature *models.Feature) (*models.Feature, error) {
	var (
		logger = rf.access.Logger.With(ctx)
		db     = rf.access.Db.MasterDB.WithContext(ctx)
	)

	err := db.Table(models.Feature{}.TableName()).Create(&feature).Error
	if err != nil {
		logger.Errorf("[CreateFeature] Failed to create feature: %v", err)
		return nil, err
	}

	return feature, nil
}

func (rf *RepositoryFeature) UpdateFeature(ctx context.Context, featureID int64, updates map[string]interface{}) (*models.Feature, error) {
	var (
		logger  = rf.access.Logger.With(ctx)
		db      = rf.access.Db.MasterDB.WithContext(ctx)
		feature models.Feature
	)

	result := db.Model(&feature).
		Clauses(clause.Returning{}).
		Where("id = ?", featureID).
		Updates(updates)

	if result.Error != nil {
		logger.Errorf("[UpdateFeature] Failed to update feature: %v", result.Error)
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		return nil, gorm.ErrRecordNotFound
	}

	return &feature, nil
}

func (rf *RepositoryFeature) GetFeatureByCode(ctx context.Context, code string) (*models.Feature, error) {
	var (
		db      = rf.access.Db.MasterDB.WithContext(ctx)
		feature models.Feature
	)

	err := db.Table(models.Feature{}.TableName()).Where("code = ?", code).First(&feature).Error
	if err != nil {
		return nil, err
	}

	return &feature, nil
}

func (rf *RepositoryFeature) GetFeatureById(ctx context.Context, featureID int64) (*models.Feature, error) {
	var (
		db      = rf.access.Db.MasterDB.WithContext(ctx)
		feature models.Feature
	)

	err := db.Table(models.Feature{}.TableName()).Where("id = ?", featureID).First(&feature).Error
	if err != nil {
		return nil, err
	}

	return &feature, nil
}
