package controllers

import (
	"app/ontology/internal/global_types"
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"
	local_utils "app/ontology/internal/utils"
	"strconv"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"github.com/gin-gonic/gin"
)

type ControllerFeature struct {
	Access *ControllerAccess
}

type ControllerFeatureMethods interface {
	GetAllFeatures(ctx *gin.Context)
	GetFeatureInstances(ctx *gin.Context)
	GetFeatureMetrics(ctx *gin.Context)
	CreateFeature(ctx *gin.Context)
	UpdateFeature(ctx *gin.Context)
}

func NewControllerFeature(access *ControllerAccess) ControllerFeatureMethods {
	return &ControllerFeature{
		Access: access,
	}
}

func (c *ControllerFeature) GetAllFeatures(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndPageParams, err := utils.GetFilterAndPageParams(ctx)
	if err != nil {
		log.Errorf("[GetAllFeatures] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := c.Access.Services.Feature.GetAllFeatures(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetAllFeatures] Failed to get features: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetFeatures{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerFeature) GetFeatureInstances(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndCursorParams, err := utils.GetFilterAndCursorParams(
		ctx,
		log,
		global_types.FeatureInstancesCursorFieldsList,
		global_types.MapQueryToFeatureInstanceProperty,
	)
	if err != nil {
		log.Errorf("[GetFeatureInstances] Failed to get filter and cursor params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	filterAndCursorParams.MaxPaginationLimit = MaxPaginationLimit
	if ctx.Query(QueryParamLimit) == "" {
		filterAndCursorParams.Limit = MaxPaginationLimit
	}

	items, pagination, appErr := c.Access.Services.Feature.GetFeatureInstances(ctx, filterAndCursorParams)
	if appErr != nil {
		log.Errorf("[GetFeatureInstances] Failed to get feature instances: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetFeatureInstances{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerFeature) GetFeatureMetrics(ctx *gin.Context) {
	log := c.Access.Logger

	featureIDStr := ctx.Param(PathParamFeatureID)
	featureID, err := strconv.ParseInt(featureIDStr, 10, 64)
	if err != nil || featureID == 0 {
		log.Errorf("[GetFeatureMetrics] Invalid feature_id: %s", featureIDStr)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	filterAndPageParams, err := utils.GetFilterAndPageParams(ctx)
	if err != nil {
		log.Errorf("[GetFeatureMetrics] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	metric, appErr := c.Access.Services.Feature.GetFeatureMetrics(ctx, featureID, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetFeatureMetrics] Failed to get metric: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetFeatureMetrics{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  metric,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerFeature) CreateFeature(ctx *gin.Context) {
	var (
		log = c.Access.Logger
		req types_ontology.RequestCreateFeature
	)

	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Errorf("[CreateFeature] Failed to bind JSON: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if !local_utils.TrimAndValidateRequired(&req.Code, &req.Name) {
		log.Errorf("[CreateFeature] Validation failed, code and name are required")
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	result, appErr := c.Access.Services.Feature.CreateFeature(ctx, &req)
	if appErr != nil {
		log.Errorf("[CreateFeature] Failed to create feature: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseCreateFeature{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  result,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerFeature) UpdateFeature(ctx *gin.Context) {
	var (
		log          = c.Access.Logger
		featureIDStr = ctx.Param(PathParamFeatureID)
		featureID, err = strconv.ParseInt(featureIDStr, 10, 64)
		req          types_ontology.RequestUpdateFeature
	)

	if err != nil || featureID == 0 {
		log.Errorf("[UpdateFeature] Invalid feature_id: %s", featureIDStr)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Errorf("[UpdateFeature] Failed to bind JSON: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if !local_utils.TrimAndValidateOptional(req.Name, req.Description) {
		log.Errorf("[UpdateFeature] Validation failed, name or description cannot be empty")
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	result, appErr := c.Access.Services.Feature.UpdateFeature(ctx, featureID, &req)
	if appErr != nil {
		log.Errorf("[UpdateFeature] Failed to update feature: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseUpdateFeature{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  result,
	}

	response.SendApiResponseV1(ctx, res, nil)
}
