package services

import (
	"context"
	"time"

	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
)

type ServiceService struct {
	access *ServiceAccess
}

type ServiceServiceMethods interface {
	GetAllServices(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetServices_Service, *types_ontology.ResponseGetServices_Pagination, *response.ApplicationError)
	GetServiceDeployments(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetServiceDeployments_ServiceDeployment, *types_ontology.ResponseGetServiceDeployments_Pagination, *response.ApplicationError)
}

func NewServiceService(access *ServiceAccess) ServiceServiceMethods {
	return &ServiceService{
		access: access,
	}
}

func (ss *ServiceService) GetAllServices(ctx context.Context, filterAndPageParams *utils.FilterAndPageParams) ([]*types_ontology.ResponseGetServices_Service, *types_ontology.ResponseGetServices_Pagination, *response.ApplicationError) {
	result, err := ss.access.Repositories.Service.GetAllServices(ctx, filterAndPageParams)
	if err != nil {
		return nil, nil, response.ErrSomethingWentWrong
	}

	var services []*types_ontology.ResponseGetServices_Service
	for _, item := range result.Result {
		services = append(services, &types_ontology.ResponseGetServices_Service{
			Id:               item.ID,
			Code:             item.Code,
			Name:             item.Name,
			CriticalityLevel: item.CriticalityLevel,
			UpdatedAt:        item.UpdatedAt.Format(time.RFC3339),
			RepositoryUrl:    item.RepositoryURL,
		})
	}

	pagination := &types_ontology.ResponseGetServices_Pagination{
		CurrentPage: int32(result.CurrentPage),
		PageSize:    int32(result.Limit),
		TotalCount:  result.TotalItems,
		TotalPages:  int32(result.TotalPages),
	}

	return services, pagination, nil
}

func (ss *ServiceService) GetServiceDeployments(ctx context.Context, filterAndCursorParams *utils.FilterAndCursorParams) ([]*types_ontology.ResponseGetServiceDeployments_ServiceDeployment, *types_ontology.ResponseGetServiceDeployments_Pagination, *response.ApplicationError) {
	var (
		logger = ss.access.Logger.With(ctx)
		result []*types_ontology.ResponseGetServiceDeployments_ServiceDeployment
	)

	data, err := ss.access.Repositories.Service.GetServiceDeployments(ctx, filterAndCursorParams)
	if err != nil {
		logger.Errorf("[GetServiceDeployments] Failed to get deployments: %+v", err)
		return nil, nil, response.ErrSomethingWentWrong
	}

	for _, d := range data.Result {
		result = append(result, &types_ontology.ResponseGetServiceDeployments_ServiceDeployment{
			Id:          d.ID,
			ServiceId:   d.ServiceID,
			Environment: d.Environment,
			Version:     d.Version,
			CommitHash:  d.CommitHash,
			DeployedAt:  time.Unix(d.DeployedAt, 0).Format(time.RFC3339),
		})
	}

	pagination := &types_ontology.ResponseGetServiceDeployments_Pagination{
		NextCursor:     data.NextCursor,
		PreviousCursor: data.PreviousCursor,
		HasNext:        data.HasNext,
		HasPrevious:    data.HasPrevious,
		Limit:          int32(data.Limit),
	}

	return result, pagination, nil
}
