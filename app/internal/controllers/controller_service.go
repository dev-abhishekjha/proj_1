package controllers

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"github.com/gin-gonic/gin"
)

type ControllerService struct {
	access *ControllerAccess
}

type ControllerServiceMethods interface {
	GetAllServices(c *gin.Context)
	GetServiceDeployments(c *gin.Context)
}

func NewControllerService(access *ControllerAccess) ControllerServiceMethods {
	return &ControllerService{
		access: access,
	}
}

func (cs *ControllerService) GetAllServices(c *gin.Context) {
	var (
		ctx = c.Request.Context()
		log = cs.access.Logger.With(ctx)
	)

	filterAndPageParams, err := utils.GetFilterAndPageParams(c)
	if err != nil {
		log.Errorf("[GetAllServices] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := cs.access.Services.Service.GetAllServices(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetAllServices] Failed to get services: %+v", appErr)
		response.SendApiResponseV1(c, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetServices{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Data:       items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(c, resp, nil)
}

func (cs *ControllerService) GetServiceDeployments(c *gin.Context) {
	var (
		ctx = c.Request.Context()
		log = cs.access.Logger.With(ctx)
	)

	filterAndCursorParams, err := utils.GetFilterAndCursorParams(
		c,
		log,
		global_types.ServiceDeploymentsCursorFieldsList,
		global_types.MapQueryToServiceDeploymentProperty,
	)
	if err != nil {
		log.Errorf("[GetServiceDeployments] Failed to get filter and cursor params: %+v", err)
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	// Keep existing default limit behavior and allow larger limits for this endpoint.
	filterAndCursorParams.MaxPaginationLimit = MaxPaginationLimit
	if c.Query(QueryParamLimit) == "" {
		filterAndCursorParams.Limit = MaxPaginationLimit
	}

	items, pagination, appErr := cs.access.Services.Service.GetServiceDeployments(ctx, filterAndCursorParams)
	if appErr != nil {
		log.Errorf("[GetServiceDeployments] Failed to get deployments: %+v", appErr)
		response.SendApiResponseV1(c, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetServiceDeployments{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(c, resp, nil)
}
