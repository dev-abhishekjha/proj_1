package services

import (
	"context"
	"time"

	"app/ontology/internal/models"
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type ServiceFeature struct {
	access *ServiceAccess
}

type ServiceFeatureMethods interface {
	GetAllFeatures(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetFeatures_Feature, *types_ontology.ResponseGetFeatures_Pagination, *response.ApplicationError)
	GetFeatureInstances(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetFeatureInstances_FeatureInstance, *types_ontology.ResponseGetFeatureInstances_Pagination, *response.ApplicationError)
	GetFeatureMetrics(ctx context.Context, featureID int64, filterAndPageParams *utils.FilterAndPageParams) (*types_ontology.ResponseGetFeatureMetrics_FeatureMetric, *response.ApplicationError)
	CreateFeature(ctx context.Context, req *types_ontology.RequestCreateFeature) (*types_ontology.ResponseCreateFeature_Feature, *response.ApplicationError)
	UpdateFeature(ctx context.Context, featureID int64, req *types_ontology.RequestUpdateFeature) (*types_ontology.ResponseUpdateFeature_Result, *response.ApplicationError)
}

func NewServiceFeature(access *ServiceAccess) ServiceFeatureMethods {
	return &ServiceFeature{
		access: access,
	}
}

func (sf *ServiceFeature) GetAllFeatures(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetFeatures_Feature, *types_ontology.ResponseGetFeatures_Pagination, *response.ApplicationError) {
	result, err := sf.access.Repositories.Feature.GetAllFeatures(ctx, filterAndPageParams)
	if err != nil {
		return nil, nil, response.ErrSomethingWentWrong
	}

	var features []*types_ontology.ResponseGetFeatures_Feature
	for _, item := range result.Result {
		features = append(features, &types_ontology.ResponseGetFeatures_Feature{
			Id:          item.ID,
			Code:        item.Code,
			Name:        item.Name,
			Description: item.Description,
			IsActive:    item.IsActive,
			CreatedAt:   item.CreatedAt.Format(time.RFC3339),
			UpdatedAt:   item.UpdatedAt.Format(time.RFC3339),
		})
	}

	pagination := &types_ontology.ResponseGetFeatures_Pagination{
		CurrentPage: int32(result.CurrentPage),
		PageSize:    int32(result.Limit),
		TotalCount:  result.TotalItems,
		TotalPages:  int32(result.TotalPages),
	}

	return features, pagination, nil
}

func (sf *ServiceFeature) GetFeatureInstances(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetFeatureInstances_FeatureInstance, *types_ontology.ResponseGetFeatureInstances_Pagination, *response.ApplicationError) {
	var (
		logger = sf.access.Logger.With(ctx)
	)

	data, err := sf.access.Repositories.Feature.GetFeatureInstances(ctx, filterAndCursorParams)
	if err != nil {
		logger.Errorf("[GetFeatureInstances] Failed to get feature instances: %+v", err)
		return nil, nil, response.ErrSomethingWentWrong
	}

	var result []*types_ontology.ResponseGetFeatureInstances_FeatureInstance
	for _, d := range data.Result {
		completedAt := ""
		if d.CompletedAt != nil {
			completedAt = time.Unix(*d.CompletedAt, 0).Format(time.RFC3339)
		}

		result = append(result, &types_ontology.ResponseGetFeatureInstances_FeatureInstance{
			Id:          d.ID,
			FeatureId:   d.FeatureID,
			Status:      d.Status,
			StartedAt:   time.Unix(d.StartedAt, 0).Format(time.RFC3339),
			CompletedAt: completedAt,
		})
	}

	pagination := &types_ontology.ResponseGetFeatureInstances_Pagination{
		NextCursor:     data.NextCursor,
		PreviousCursor: data.PreviousCursor,
		HasNext:        data.HasNext,
		HasPrevious:    data.HasPrevious,
		Limit:          int32(data.Limit),
	}

	return result, pagination, nil
}

func (sf *ServiceFeature) GetFeatureMetrics(ctx context.Context, featureID int64, filterAndPageParams *utils.FilterAndPageParams) (*types_ontology.ResponseGetFeatureMetrics_FeatureMetric, *response.ApplicationError) {
	var (
		logger = sf.access.Logger.With(ctx)
	)

	data, err := sf.access.Repositories.Feature.GetFeatureMetrics(ctx, featureID, filterAndPageParams)
	if err != nil {
		logger.Errorf("[GetFeatureMetrics] Failed to get feature metrics: %+v", err)
		return nil, response.ErrSomethingWentWrong
	}

	result := &types_ontology.ResponseGetFeatureMetrics_FeatureMetric{
		WindowStart:   data.WindowStart.Format(time.RFC3339),
		WindowMinutes: data.WindowMinutes,
		TotalCount:    data.TotalCount,
		SuccessRate:   data.SuccessRate,
		FailureRate:   data.FailureRate,
		P50DurationMs: data.P50DurationMs,
		P95DurationMs: data.P95DurationMs,
		P99DurationMs: data.P99DurationMs,
		CreatedAt:     time.Unix(data.CreatedAt, 0).Format(time.RFC3339),
	}

	return result, nil
}

func (sf *ServiceFeature) CreateFeature(ctx context.Context, req *types_ontology.RequestCreateFeature) (*types_ontology.ResponseCreateFeature_Feature, *response.ApplicationError) {
	var (
		logger = sf.access.Logger.With(ctx)
	)

	// Check if already exists
	existing, _ := sf.access.Repositories.Feature.GetFeatureByCode(ctx, req.Code)
	if existing != nil {
		logger.Errorf("[CreateFeature] feature code already exists: %s", req.Code)
		return nil, response.ErrFeatureAlreadyExists
	}

	modelFeature := &models.Feature{
		Code:        req.Code,
		Name:        req.Name,
		Description: req.Description,
		IsActive:    req.IsActive,
	}

	feature, err := sf.access.Repositories.Feature.CreateFeature(ctx, modelFeature)
	if err != nil {
		logger.Errorf("[CreateFeature] Failed to create feature: %+v", err)
		return nil, response.ErrCreateFeatureFailed
	}

	return &types_ontology.ResponseCreateFeature_Feature{
		Id:          feature.ID,
		Code:        feature.Code,
		Name:        feature.Name,
		Description: feature.Description,
		IsActive:    feature.IsActive,
		CreatedAt:   feature.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   feature.UpdatedAt.Format(time.RFC3339),
	}, nil
}

func (sf *ServiceFeature) UpdateFeature(ctx context.Context, featureID int64, req *types_ontology.RequestUpdateFeature) (*types_ontology.ResponseUpdateFeature_Result, *response.ApplicationError) {
	var (
		logger = sf.access.Logger.With(ctx)
	)

	_, err := sf.access.Repositories.Feature.GetFeatureById(ctx, featureID)
	if err != nil {
		logger.Errorf("[UpdateFeature] feature not found: %v", err)
		return nil, response.ErrFeatureNotFound
	}

	updates := make(map[string]interface{})
	if req.Name != nil {
		updates[ParamName] = *req.Name
	}
	if req.Description != nil {
		updates[ParamDescription] = *req.Description
	}
	if req.IsActive != nil {
		updates[ParamIsActive] = *req.IsActive
	}

	feature, err := sf.access.Repositories.Feature.UpdateFeature(ctx, featureID, updates)
	if err != nil {
		logger.Errorf("[UpdateFeature] Failed to update feature: %+v", err)
		return nil, response.ErrUpdateFeatureFailed
	}

	return &types_ontology.ResponseUpdateFeature_Result{
		Id:          feature.ID,
		Name:        feature.Name,
		Code:        feature.Code,
		Description: feature.Description,
		IsActive:    feature.IsActive,
		CreatedAt:   utils.TimeToString(&feature.CreatedAt),
		UpdatedAt:   utils.TimeToString(&feature.UpdatedAt),
	}, nil
}
