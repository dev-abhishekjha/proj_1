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

type ControllerEntity struct {
	Access *ControllerAccess
}

type ControllerEntityMethods interface {
	GetEntities(ctx *gin.Context)
	GetEntityMetrics(ctx *gin.Context)
	GetEntityTransitions(ctx *gin.Context)
	CreateEntity(ctx *gin.Context)
	UpdateEntity(ctx *gin.Context)
	GetEntityApis(ctx *gin.Context)
}

func NewControllerEntity(access *ControllerAccess) ControllerEntityMethods {
	return &ControllerEntity{
		Access: access,
	}
}

func (c *ControllerEntity) GetEntities(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndPageParams, err := utils.GetFilterAndPageParams(ctx)
	if err != nil {
		log.Errorf("[GetEntities] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := c.Access.Services.Entity.GetEntities(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetEntities] Failed to get entities: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetEntities{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Data:       items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerEntity) GetEntityTransitions(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndPageParams, err := utils.GetFilterAndPageParams(ctx)
	if err != nil {
		log.Errorf("[GetEntityTransitions] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	items, appErr := c.Access.Services.Entity.GetEntityTransitions(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetEntityTransitions] Failed to get entity transitions: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetEntityTransitions{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  items,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerEntity) GetEntityMetrics(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndCursorParams, err := utils.GetFilterAndCursorParams(
		ctx,
		log,
		global_types.EntityMetricsCursorFieldsList,
		global_types.MapQueryMetricProperties,
	)
	if err != nil {
		log.Errorf("[GetEntityMetrics] Failed to get filter and cursor params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	entityIdStr := ctx.Param(PathParamEntityID)
	entityId, err := strconv.ParseInt(entityIdStr, 10, 64)
	if err != nil || entityId == 0 {
		log.Errorf("[GetEntityMetrics] Invalid entity_id param: %s", entityIdStr)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := c.Access.Services.Entity.GetEntityMetrics(ctx, entityId, filterAndCursorParams)
	if appErr != nil {
		log.Errorf("[GetEntityMetrics] Failed to get entity metrics: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetEntityMetrics{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerEntity) CreateEntity(ctx *gin.Context) {
	var (
		log = c.Access.Logger
		req types_ontology.RequestCreateEntity
	)

	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Errorf("[CreateEntity] Failed to bind JSON: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if !local_utils.TrimAndValidateRequired(&req.Code, &req.Name) {
		log.Errorf("[CreateEntity] Validation failed, code and name are required")
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	result, appErr := c.Access.Services.Entity.CreateEntity(ctx, &req)
	if appErr != nil {
		log.Errorf("[CreateEntity] Failed to create entity: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseCreateEntity{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  result,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerEntity) UpdateEntity(ctx *gin.Context) {
	var (
		log           = c.Access.Logger
		entityIdStr   = ctx.Param(PathParamEntityID)
		entityId, err = strconv.ParseInt(entityIdStr, 10, 64)
		req           types_ontology.RequestUpdateEntity
	)

	if err != nil || entityId == 0 {
		log.Errorf("[UpdateEntity] Invalid entity_id param: %s", entityIdStr)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Errorf("[UpdateEntity] Failed to bind JSON: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if !local_utils.TrimAndValidateOptional(req.Code, req.Name) {
		log.Errorf("[UpdateEntity] Validation failed, code or name cannot be empty")
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	result, appErr := c.Access.Services.Entity.UpdateEntity(ctx, entityId, &req)
	if appErr != nil {
		log.Errorf("[UpdateEntity] Failed to update entity: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseUpdateEntity{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  result,
	}

	response.SendApiResponseV1(ctx, res, nil)
}

func (c *ControllerEntity) GetEntityApis(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndPageParams, err := utils.GetFilterAndPageParams(ctx)
	if err != nil {
		log.Errorf("[GetEntityApis] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	entityIdStr := ctx.Param(PathParamEntityID)
	entityId, err := strconv.ParseInt(entityIdStr, 10, 64)
	if err != nil || entityId == 0 {
		log.Errorf("[GetEntityApis] Invalid entity_id param: %s", entityIdStr)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := c.Access.Services.Entity.GetEntityApis(ctx, entityId, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetEntityApis] Failed to get entity apis: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	res := &types_ontology.ResponseGetEntityApis{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Data:       items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(ctx, res, nil)
}
