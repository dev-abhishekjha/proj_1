package controllers

import (
	"app/ontology/internal/response"
	types_ontology "app/ontology/internal/types/ontology"

	"bitbucket.org/fyscal/be-commons/pkg/utils"
	"github.com/gin-gonic/gin"
)

type ControllerKpi struct {
	access *ControllerAccess
}

type ControllerKpiMethods interface {
	GetAllKpis(c *gin.Context)
	GetAllKpiRelationships(c *gin.Context)
}

func NewControllerKpi(access *ControllerAccess) ControllerKpiMethods {
	return &ControllerKpi{
		access: access,
	}
}

func (ck *ControllerKpi) GetAllKpis(c *gin.Context) {
	var (
		ctx = c.Request.Context()
		log = ck.access.Logger.With(ctx)
	)

	filterAndPageParams, err := utils.GetFilterAndPageParams(c)
	if err != nil {
		log.Errorf("[GetAllKpis] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := ck.access.Services.Kpi.GetAllKpis(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetAllKpis] Failed to get kpis: %+v", appErr)
		response.SendApiResponseV1(c, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetKpis{
		Code:       string(response.APISuccessCode),
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: (*types_ontology.ResponseGetKpis_Pagination)(pagination),
	}

	response.SendApiResponseV1(c, resp, nil)
}

func (ck *ControllerKpi) GetAllKpiRelationships(c *gin.Context) {
	var (
		ctx = c.Request.Context()
		log = ck.access.Logger.With(ctx)
	)

	filterAndPageParams, err := utils.GetFilterAndPageParams(c)
	if err != nil {
		log.Errorf("[GetAllKpiRelationships] Failed to get filter and page params: %+v", err)
		response.SendApiResponseV1(c, nil, response.ErrInvalidParams)
		return
	}

	items, pagination, appErr := ck.access.Services.Kpi.GetAllKpiRelationships(ctx, filterAndPageParams)
	if appErr != nil {
		log.Errorf("[GetAllKpiRelationships] Failed to get kpi relationships: %+v", appErr)
		response.SendApiResponseV1(c, nil, appErr)
		return
	}

	resp := &types_ontology.ResponseGetKpiRelationships{
		Code:       string(response.APISuccessCode),
		Message:    response.APISuccessMessage,
		Result:     items,
		Pagination: (*types_ontology.ResponseGetKpiRelationships_Pagination)(pagination),
	}

	response.SendApiResponseV1(c, resp, nil)
}
