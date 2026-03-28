package repositories

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/models"
	"context"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type RepositoryApi struct {
	access *RepositoryAccess
}

type RepositoryApiMethods interface {
	GetAllApis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Api], error)
	GetApiMetrics(ctx context.Context, apiID int64, filterAndCursorParams *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.ApiMetric], error)
}

func NewRepositoryApi(access *RepositoryAccess) RepositoryApiMethods {
	return &RepositoryApi{
		access: access,
	}
}

func (ra *RepositoryApi) GetAllApis(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Api], error) {
	resultModel := []*models.Api{}

	query := ra.access.Db.SlaveDB.WithContext(ctx).Model(&models.Api{})
	result, err := utils.PaginateWithSearchFilter(query, global_types.MapQueryToApiProperty, filterAndPageParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (ra *RepositoryApi) GetApiMetrics(ctx context.Context, apiID int64, filterAndCursorParams *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.ApiMetric], error) {
	logger := ra.access.Logger.With(ctx)

	query := ra.access.ClickHouseDb.GetDB().WithContext(ctx).
		Model(&models.ApiMetric{})

	return utils.PaginateCursorWithSearchFilter(
		logger,
		query,
		filterAndCursorParams,
		[]*models.ApiMetric{},
	)
}
