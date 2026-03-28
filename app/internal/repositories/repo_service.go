package repositories

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/models"
	"context"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type RepositoryService struct {
	access *RepositoryAccess
}

type RepositoryServiceMethods interface {
	GetAllServices(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Service], error)
	GetServiceDeployments(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.ServiceDeployment], error)
}

func NewRepositoryService(access *RepositoryAccess) RepositoryServiceMethods {
	return &RepositoryService{
		access: access,
	}
}

func (rs *RepositoryService) GetAllServices(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) (*utils.PaginatedResult[models.Service], error) {
	resultModel := []*models.Service{}

	query := rs.access.Db.SlaveDB.WithContext(ctx).Model(&models.Service{})
	result, err := utils.PaginateWithSearchFilter(query, global_types.MapQueryToServiceProperty, filterAndPageParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (rs *RepositoryService) GetServiceDeployments(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) (*utils.PaginatedCursorResult[models.ServiceDeployment], error) {
	var (
		resultModel []*models.ServiceDeployment
		logger      = rs.access.Logger.With(ctx)
	)

	query := rs.access.ClickHouseDb.GetDB().WithContext(ctx).Model(&models.ServiceDeployment{})
	result, err := utils.PaginateCursorWithSearchFilter(logger, query, filterAndCursorParams, resultModel)
	if err != nil {
		return nil, err
	}

	return result, nil
}
