package controllers

import (
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"
	"strconv"

	local_utils "app/ontology/internal/utils"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"github.com/gin-gonic/gin"
)

type ControllerTeam struct {
	Access *ControllerAccess
}

type ControllerTeamMethods interface {
	GetAllTeams(ctx *gin.Context)
	GetFeatureTeams(ctx *gin.Context)
	CreateTeam(ctx *gin.Context)
	UpdateTeam(ctx *gin.Context)
}

func NewControllerTeam(access *ControllerAccess) ControllerTeamMethods {
	return &ControllerTeam{
		Access: access,
	}
}

func (c *ControllerTeam) GetAllTeams(ctx *gin.Context) {
	log := c.Access.Logger

	filterAndPageParams, err := utils.GetFilterAndPageParams(ctx)
	if err != nil {
		log.Errorf("[GetAllTeams] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}
	items, pagination, appErr := c.Access.Services.Team.GetAllTeams(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetAllTeams] Failed to get teams: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetTeams{
		Code:       response.APISuccessCode,
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: pagination,
	}

	response.SendApiResponseV1(ctx, resp, nil)
}

func (c *ControllerTeam) GetFeatureTeams(ctx *gin.Context) {
	log := c.Access.Logger

	featureIDParam := ctx.Param(PathParamFeatureID)
	featureID, err := strconv.ParseInt(featureIDParam, 10, 64)
	if err != nil {
		log.Errorf("[GetFeatureTeams] Invalid feature_id: %s", featureIDParam)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	items, appErr := c.Access.Services.Team.GetFeatureTeams(ctx, featureID)
	if appErr != nil {
		log.Errorf("[GetFeatureTeams] Failed to get feature teams: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetFeatureTeams{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  items,
	}

	response.SendApiResponseV1(ctx, resp, nil)
}

func (c *ControllerTeam) CreateTeam(ctx *gin.Context) {
	var (
		log = c.Access.Logger
		req types_ontology.RequestCreateTeam
	)

	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Errorf("[CreateTeam] Failed to bind JSON: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if !local_utils.TrimAndValidateRequired(&req.Name, &req.SlackChannel) {
		log.Errorf("[CreateTeam] Validation failed, name and slack_channel are required")
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	result, appErr := c.Access.Services.Team.CreateTeam(ctx, &req)
	if appErr != nil {
		log.Errorf("[CreateTeam] Failed to create team: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseCreateTeam{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  result,
	}

	response.SendApiResponseV1(ctx, resp, nil)
}

func (c *ControllerTeam) UpdateTeam(ctx *gin.Context) {
	var (
		log = c.Access.Logger
		req types_ontology.RequestUpdateTeam
	)

	teamIDStr := ctx.Param(PathParamTeamID)
	teamID, err := strconv.ParseInt(teamIDStr, 10, 64)
	if err != nil || teamID == 0 {
		log.Errorf("[UpdateTeam] Invalid team_id: %s", teamIDStr)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Errorf("[UpdateTeam] Failed to bind JSON: %+v", err)
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	if !local_utils.TrimAndValidateOptional(req.Name, req.SlackChannel) {
		log.Errorf("[UpdateTeam] Validation failed, name and slack_channel cannot be empty")
		response.SendApiResponseV1(ctx, nil, response.ErrInvalidParams)
		return
	}

	result, appErr := c.Access.Services.Team.UpdateTeam(ctx, teamID, &req)
	if appErr != nil {
		log.Errorf("[UpdateTeam] Failed to update team: %+v", appErr)
		response.SendApiResponseV1(ctx, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseUpdateTeam{
		Code:    response.APISuccessCode,
		Message: response.APISuccessMessage,
		Result:  result,
	}

	response.SendApiResponseV1(ctx, resp, nil)
}
