package services

import (
	"context"
	"time"

	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type ServiceKpi struct {
	access *ServiceAccess
}

type ServiceKpiMethods interface {
	GetAllKpis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetKpis_Kpi, *types_ontology.ResponseGetKpis_Pagination, *response.ApplicationError)
	GetAllKpiRelationships(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetKpiRelationships_KpiRelationship, *types_ontology.ResponseGetKpiRelationships_Pagination, *response.ApplicationError)
}

func NewServiceKpi(access *ServiceAccess) ServiceKpiMethods {
	return &ServiceKpi{
		access: access,
	}
}

func (sk *ServiceKpi) GetAllKpis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetKpis_Kpi, *types_ontology.ResponseGetKpis_Pagination, *response.ApplicationError) {
	var (
		logger = sk.access.Logger.With(ctx)
		kpis   []*types_ontology.ResponseGetKpis_Kpi
	)

	result, err := sk.access.Repositories.Kpi.GetAllKpis(ctx, filterAndPageParams)
	if err != nil {
		logger.Errorf("[GetAllKpis] Failed to get kpis: %+v", err)
		return nil, nil, response.ErrFetchingKpis
	}

	for _, item := range result.Result {
		kpis = append(kpis, &types_ontology.ResponseGetKpis_Kpi{
			Id:          item.ID,
			Code:        item.Code,
			Name:        item.Name,
			Description: item.Description,
			MetricType:  item.MetricType,
			Unit:        item.Unit,
			CreatedAt:   item.CreatedAt.Format(time.RFC3339),
			UpdatedAt:   item.UpdatedAt.Format(time.RFC3339),
		})
	}

	pagination := &types_ontology.ResponseGetKpis_Pagination{
		CurrentPage: int32(result.CurrentPage),
		PageSize:    int32(result.Limit),
		TotalCount:  result.TotalItems,
		TotalPages:  int32(result.TotalPages),
	}

	return kpis, pagination, nil
}

func (sk *ServiceKpi) GetAllKpiRelationships(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetKpiRelationships_KpiRelationship, *types_ontology.ResponseGetKpiRelationships_Pagination, *response.ApplicationError) {
	var (
		logger        = sk.access.Logger.With(ctx)
		relationships []*types_ontology.ResponseGetKpiRelationships_KpiRelationship
	)

	result, err := sk.access.Repositories.Kpi.GetAllKpiRelationships(ctx, filterAndPageParams)
	if err != nil {
		logger.Errorf("[GetAllKpiRelationships] Failed to get kpi relationships: %+v", err)
		return nil, nil, response.ErrFetchingKpiRelationships
	}

	for _, item := range result.Result {
		var weightReviewedAt string
		if item.WeightReviewedAt != nil {
			weightReviewedAt = item.WeightReviewedAt.Format(time.RFC3339)
		}

		relationships = append(relationships, &types_ontology.ResponseGetKpiRelationships_KpiRelationship{
			Id:               item.ID,
			KpiId:            item.KpiID,
			RelationType:     item.RelationType,
			TargetType:       item.TargetType,
			TargetId:         item.TargetID,
			WeightSetBy:      item.WeightSetBy,
			WeightReviewedBy: item.WeightReviewedBy,
			WeightReviewedAt: weightReviewedAt,
			Weight:           float32(item.Weight),
			CreatedAt:        item.CreatedAt.Format(time.RFC3339),
			UpdatedAt:        item.UpdatedAt.Format(time.RFC3339),
		})
	}

	pagination := &types_ontology.ResponseGetKpiRelationships_Pagination{
		CurrentPage: int32(result.CurrentPage),
		PageSize:    int32(result.Limit),
		TotalCount:  result.TotalItems,
		TotalPages:  int32(result.TotalPages),
	}

	return relationships, pagination, nil
}
