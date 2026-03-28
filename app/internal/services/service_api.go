package services

import (
	"context"
	"time"

	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type ServiceApi struct {
	access *ServiceAccess
}

type ServiceApiMethods interface {
	GetAllApis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetApis_Api, *types_ontology.ResponseGetApis_Pagination, *response.ApplicationError)
	GetApiMetrics(ctx context.Context, apiID int64, filterAndCursorParams *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetApiMetrics_ApiMetric, *types_ontology.ResponseGetApiMetrics_Pagination, *response.ApplicationError)
}

func NewServiceApi(access *ServiceAccess) ServiceApiMethods {
	return &ServiceApi{
		access: access,
	}
}

func (sa *ServiceApi) GetAllApis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetApis_Api, *types_ontology.ResponseGetApis_Pagination, *response.ApplicationError) {
	result, err := sa.access.Repositories.Api.GetAllApis(ctx, filterAndPageParams)
	if err != nil {
		return nil, nil, response.ErrSomethingWentWrong
	}

	var apis []*types_ontology.ResponseGetApis_Api
	for _, item := range result.Result {
		apis = append(apis, &types_ontology.ResponseGetApis_Api{
			Id:         item.ID,
			Endpoint:   item.Endpoint,
			Method:     item.HttpMethod,
			Protocol:   item.Protocol,
			IsInternal: item.IsInternal,
			CreatedAt:  item.CreatedAt.Format(time.RFC3339),
		})
	}

	pagination := &types_ontology.ResponseGetApis_Pagination{
		CurrentPage: int32(result.CurrentPage),
		PageSize:    int32(result.Limit),
		TotalCount:  result.TotalItems,
		TotalPages:  int32(result.TotalPages),
	}

	return apis, pagination, nil
}

func (sa *ServiceApi) GetApiMetrics(ctx context.Context, apiID int64, filterAndCursorParams *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetApiMetrics_ApiMetric, *types_ontology.ResponseGetApiMetrics_Pagination, *response.ApplicationError) {
	var (
		logger = sa.access.Logger.With(ctx)
	)

	result, err := sa.access.Repositories.Api.GetApiMetrics(ctx, apiID, filterAndCursorParams)
	if err != nil {
		logger.Errorf("[GetApiMetrics] Failed to get api metrics: %+v", err)
		return nil, nil, response.ErrSomethingWentWrong
	}

	data := make([]*types_ontology.ResponseGetApiMetrics_ApiMetric, 0)
	if result != nil {
		for _, m := range result.Result {
			data = append(data, &types_ontology.ResponseGetApiMetrics_ApiMetric{
				WindowStart:   m.WindowStart.UTC().Format(time.RFC3339),
				WindowMinutes: m.WindowMinutes,
				TotalCount:    m.TotalCalls,
				SuccessRate:   m.SuccessRate,
				FailureRate:   m.ErrorRate,
				P50DurationMs: m.P50LatencyMs,
				P95DurationMs: m.P95LatencyMs,
				P99DurationMs: m.P99LatencyMs,
				CreatedAt:     time.Unix(m.CreatedAt, 0).UTC().Format(time.RFC3339),
			})
		}
	}

	var pagination *types_ontology.ResponseGetApiMetrics_Pagination
	if result != nil {
		pagination = &types_ontology.ResponseGetApiMetrics_Pagination{
			NextCursor:     result.NextCursor,
			PreviousCursor: result.PreviousCursor,
			HasNext:        result.HasNext,
			HasPrevious:    result.HasPrevious,
			Limit:          int32(result.Limit),
		}
	}

	return data, pagination, nil
}
