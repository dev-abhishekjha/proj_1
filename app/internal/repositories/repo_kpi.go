package repositories

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/models"
	"context"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type RepositoryKpi struct {
	access *RepositoryAccess
}

type RepositoryKpiMethods interface {
	GetAllKpis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Kpi], error)
	GetAllKpiRelationships(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.KpiRelationship], error)
}

func NewRepositoryKpi(access *RepositoryAccess) RepositoryKpiMethods {
	return &RepositoryKpi{
		access: access,
	}
}

func (rk *RepositoryKpi) GetAllKpis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Kpi], error) {
	var (
		resultModel = []*models.Kpi{}
		query       = rk.access.Db.SlaveDB.WithContext(ctx).Model(&models.Kpi{})
	)

	result, err := utils.PaginateWithSearchFilter(query, global_types.MapQueryToKpiProperty, filterAndPageParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (rk *RepositoryKpi) GetAllKpiRelationships(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.KpiRelationship], error) {
	var (
		resultModel = []*models.KpiRelationship{}
		query       = rk.access.Db.SlaveDB.WithContext(ctx).Model(&models.KpiRelationship{})
	)

	result, err := utils.PaginateWithSearchFilter(query, global_types.MapQueryToKpiRelationshipProperty, filterAndPageParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}
