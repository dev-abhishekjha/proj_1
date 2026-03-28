package controllers

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"
	"strconv"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"github.com/gin-gonic/gin"
)

type ControllerApi struct {
	access *ControllerAccess
}

type ControllerApiMethods interface {
	GetAllApis(c *gin.Context)
	GetApiMetrics(c *gin.Context)
}

func NewControllerApi(access *ControllerAccess) ControllerApiMethods {
	return &ControllerApi{
		access: access,
	}
}

func (ca *ControllerApi) GetAllApis(c *gin.Context) {
	var (
		ctx = c.Request.Context()
		log = ca.access.Logger.With(ctx)
	)

	filterAndPageParams, err := utils.GetFilterAndPageParams(c)
	if err != nil {
		log.Errorf("[GetAllApis] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := ca.access.Services.Api.GetAllApis(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetAllApis] Failed to get apis: %+v", appErr)
		response.SendApiResponseV1(c, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetApis{
		Code:       string(response.APISuccessCode),
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(c, resp, nil)
}

func (ca *ControllerApi) GetApiMetrics(c *gin.Context) {
	var (
		ctx = c.Request.Context()
		log = ca.access.Logger.With(ctx)
	)

	apiIDStr := c.Param(PathParamApiID)
	apiID, err := strconv.ParseInt(apiIDStr, 10, 64)
	if err != nil {
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	filterAndCursorParams, err := utils.GetFilterAndCursorParams(
		c,
		log,
		global_types.ApiMetricsCursorFieldsList,
		global_types.MapQueryToApiMetricProperty,
	)
	if err != nil {
		log.Errorf("[GetApiMetrics] Failed to get filter and cursor params: %+v", err)
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	filterAndCursorParams.MaxPaginationLimit = MaxPaginationLimit
	if filterAndCursorParams.Limit > MaxPaginationLimit {
		filterAndCursorParams.Limit = MaxPaginationLimit
	}

	items, pagination, appErr := ca.access.Services.Api.GetApiMetrics(ctx, apiID, filterAndCursorParams)
	if appErr != nil {
		log.Errorf("[GetApiMetrics] Failed to get metric: %+v", appErr)
		response.SendApiResponseV1(c, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetApiMetrics{
		Code:       string(response.APISuccessCode),
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(c, resp, nil)
}
