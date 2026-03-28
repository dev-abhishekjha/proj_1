package services

import (
	"app/ontology/internal/models"
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"
	"errors"
	"time"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ServiceEntity struct {
	Access *ServiceAccess
}

type ServiceEntityMethods interface {
	GetEntities(ctx *gin.Context, params *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetEntities_Entity, *types_ontology.ResponseGetEntities_Pagination, *response.ApplicationError)
	GetEntityTransitions(ctx *gin.Context, params *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetEntityTransitions_Transition, *response.ApplicationError)
	GetEntityMetrics(ctx *gin.Context, entityId int64, params *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetEntityMetrics_Metric, *types_ontology.ResponseGetEntityMetrics_Pagination, *response.ApplicationError)
	CreateEntity(ctx *gin.Context, req *types_ontology.RequestCreateEntity) (*types_ontology.ResponseCreateEntity_Result, *response.ApplicationError)
	UpdateEntity(ctx *gin.Context, entityID int64, req *types_ontology.RequestUpdateEntity) (*types_ontology.ResponseUpdateEntity_Result, *response.ApplicationError)
	GetEntityApis(ctx *gin.Context, entityID int64, params *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetEntityApis_Api, *types_ontology.ResponseGetEntityApis_Pagination, *response.ApplicationError)
}

func NewServiceEntity(access *ServiceAccess) ServiceEntityMethods {
	return &ServiceEntity{
		Access: access,
	}
}

func (s *ServiceEntity) GetEntities(ctx *gin.Context, params *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetEntities_Entity, *types_ontology.ResponseGetEntities_Pagination, *response.ApplicationError) {
	result, err := s.Access.Repositories.Entity.GetEntities(params)
	if err != nil {
		return nil, nil, response.ErrFetchingEntitiesFailed
	}

	data := make([]*types_ontology.ResponseGetEntities_Entity, 0)
	if result != nil {
		for _, e := range result.Result {
			data = append(data, &types_ontology.ResponseGetEntities_Entity{
				Id:           e.ID,
				FeatureId:    Int64PointerToValue(e.FeatureID),
				Code:         e.Code,
				Description:  e.Description,
				DisplayOrder: int32(e.DisplayOrder),
				Name:         e.Name,
				IsStart:      e.IsStart,
				IsTerminal:   e.IsTerminal,
				CreatedAt:    utils.TimeToString(&e.CreatedAt),
				UpdatedAt:    utils.TimeToString(&e.UpdatedAt),
			})
		}
	}

	var pagination *types_ontology.ResponseGetEntities_Pagination
	if result != nil {
		pagination = &types_ontology.ResponseGetEntities_Pagination{
			CurrentPage: int32(result.CurrentPage),
			PageSize:    int32(result.Limit),
			TotalCount:  result.TotalItems,
			TotalPages:  int32(result.TotalPages),
		}
	}

	return data, pagination, nil
}

func (s *ServiceEntity) GetEntityTransitions(ctx *gin.Context, params *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetEntityTransitions_Transition, *response.ApplicationError) {
	result, err := s.Access.Repositories.Entity.GetEntityTransitions(params)
	if err != nil {
		return nil, response.ErrFetchingEntityTransitionsFailed
	}

	data := make([]*types_ontology.ResponseGetEntityTransitions_Transition, 0)
	if result != nil {
		for _, t := range result.Result {
			data = append(data, &types_ontology.ResponseGetEntityTransitions_Transition{
				Id:                   t.ID,
				FromEntityId:         t.FromEntityID,
				ToEntityId:           t.ToEntityID,
				ConditionExpression:  t.ConditionExpression,
				TransitionType:       t.TransitionType,
				ConditionDescription: t.ConditionDescription,
			})
		}
	}

	return data, nil
}

func (s *ServiceEntity) GetEntityMetrics(ctx *gin.Context, entityId int64, params *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetEntityMetrics_Metric, *types_ontology.ResponseGetEntityMetrics_Pagination, *response.ApplicationError) {
	result, err := s.Access.Repositories.Entity.GetEntityMetrics(ctx, entityId, params)
	if err != nil {
		return nil, nil, response.ErrFetchingEntityMetricsFailed
	}

	data := make([]*types_ontology.ResponseGetEntityMetrics_Metric, 0)
	if result != nil {
		for _, m := range result.Result {
			data = append(data, &types_ontology.ResponseGetEntityMetrics_Metric{
				WindowStart:   m.WindowStart.UTC().Format(time.RFC3339),
				WindowMinutes: m.WindowMinutes,
				TotalCount:    m.TotalCount,
				SuccessRate:   float32(m.SuccessRate),
				FailureRate:   float32(m.FailureRate),
				P50DurationMs: float32(m.P50DurationMs),
				P95DurationMs: float32(m.P95DurationMs),
				P99DurationMs: float32(m.P99DurationMs),
				CreatedAt:     time.Unix(m.CreatedAt, 0).UTC().Format(time.RFC3339),
			})
		}
	}

	var pagination *types_ontology.ResponseGetEntityMetrics_Pagination
	if result != nil {
		pagination = &types_ontology.ResponseGetEntityMetrics_Pagination{
			NextCursor:     result.NextCursor,
			PreviousCursor: result.PreviousCursor,
			HasNext:        result.HasNext,
			HasPrevious:    result.HasPrevious,
			Limit:          int32(result.Limit),
		}
	}

	return data, pagination, nil
}

func (s *ServiceEntity) CreateEntity(ctx *gin.Context, req *types_ontology.RequestCreateEntity) (*types_ontology.ResponseCreateEntity_Result, *response.ApplicationError) {

	existingEntity, err := s.Access.Repositories.Entity.GetEntityByCode(ctx, req.Code)
	if err == nil && existingEntity != nil {
		return nil, response.ErrEntityAlreadyExists
	}
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, response.ErrCreateEntityFailed
	}

	var featureID *int64
	if req.FeatureId != 0 {
		featureID = &req.FeatureId
	}

	entity := &models.Entity{
		FeatureID:    featureID,
		Code:         req.Code,
		Name:         req.Name,
		Description:  req.Description,
		DisplayOrder: int(req.DisplayOrder),
		IsStart:      req.IsStart,
		IsTerminal:   req.IsTerminal,
	}

	result, err := s.Access.Repositories.Entity.CreateEntity(ctx, entity)
	if err != nil {
		return nil, response.ErrCreateEntityFailed
	}

	if req.ApiIds != nil {
		err = s.Access.Repositories.Entity.SetEntityApis(ctx, result.ID, req.ApiIds)
		if err != nil {
			return nil, response.ErrCreateEntityFailed
		}
	}

	return &types_ontology.ResponseCreateEntity_Result{
		Id:           result.ID,
		FeatureId:    Int64PointerToValue(result.FeatureID),
		Code:         result.Code,
		Name:         result.Name,
		Description:  result.Description,
		DisplayOrder: int32(result.DisplayOrder),
		IsStart:      result.IsStart,
		IsTerminal:   result.IsTerminal,
		CreatedAt:    utils.TimeToString(&result.CreatedAt),
		UpdatedAt:    utils.TimeToString(&result.UpdatedAt),
	}, nil
}

func (s *ServiceEntity) UpdateEntity(ctx *gin.Context, entityID int64, req *types_ontology.RequestUpdateEntity) (*types_ontology.ResponseUpdateEntity_Result, *response.ApplicationError) {
	updates := make(map[string]interface{})

	if req.Name != nil {
		updates[ParamName] = *req.Name
	}
	if req.Code != nil {
		updates[ParamCode] = *req.Code
	}
	if req.Description != nil {
		updates[ParamDescription] = *req.Description
	}
	if req.DisplayOrder != nil && *req.DisplayOrder != 0 {
		updates[ParamDisplayOrder] = int(*req.DisplayOrder)
	}

	updates[ParamIsStart] = req.IsStart
	updates[ParamIsTerminal] = req.IsTerminal

	if req.FeatureId != nil && *req.FeatureId != 0 {
		currentEntity, err := s.Access.Repositories.Entity.GetEntityById(ctx, entityID)
		if err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, response.ErrEntityNotFound
			}
			return nil, response.ErrUpdateEntityFailed
		}
		if currentEntity.FeatureID != nil {
			return nil, response.ErrFeatureIdAlreadySet
		}
		updates[ParamFeatureID] = req.FeatureId
	}

	entity, err := s.Access.Repositories.Entity.UpdateEntity(ctx, entityID, updates)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, response.ErrEntityNotFound
		}
		return nil, response.ErrUpdateEntityFailed
	}

	if req.ApiIds != nil {
		err = s.Access.Repositories.Entity.SetEntityApis(ctx, entity.ID, req.ApiIds)
		if err != nil {
			return nil, response.ErrUpdateEntityFailed
		}
	}

	return &types_ontology.ResponseUpdateEntity_Result{
		Id:           entity.ID,
		FeatureId:    Int64PointerToValue(entity.FeatureID),
		Code:         entity.Code,
		Name:         entity.Name,
		Description:  entity.Description,
		DisplayOrder: int32(entity.DisplayOrder),
		IsStart:      entity.IsStart,
		IsTerminal:   entity.IsTerminal,
		CreatedAt:    utils.TimeToString(&entity.CreatedAt),
		UpdatedAt:    utils.TimeToString(&entity.UpdatedAt),
	}, nil
}

func (s *ServiceEntity) GetEntityApis(ctx *gin.Context, entityID int64, params *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetEntityApis_Api, *types_ontology.ResponseGetEntityApis_Pagination, *response.ApplicationError) {
	result, err := s.Access.Repositories.Entity.GetEntityApis(entityID, params)
	if err != nil {
		return nil, nil, response.ErrFetchingEntityApisFailed
	}

	data := make([]*types_ontology.ResponseGetEntityApis_Api, 0)
	if result != nil {
		for _, ea := range result.Result {
			data = append(data, &types_ontology.ResponseGetEntityApis_Api{
				Id:                ea.Api.ID,
				Endpoint:          ea.Api.Endpoint,
				Method:            ea.Api.HttpMethod,
				IsInternal:        ea.Api.IsInternal,
				Description:       ea.Api.Description,
				ServiceIdentifier: "", // Optional: link to service if available
			})
		}
	}

	var pagination *types_ontology.ResponseGetEntityApis_Pagination
	if result != nil {
		pagination = &types_ontology.ResponseGetEntityApis_Pagination{
			CurrentPage: int32(result.CurrentPage),
			PageSize:    int32(result.Limit),
			TotalCount:  result.TotalItems,
			TotalPages:  int32(result.TotalPages),
		}
	}

	return data, pagination, nil
}
