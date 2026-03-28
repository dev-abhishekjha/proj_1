package controllers

import (
	"app/ontology/internal/config"
	"app/ontology/internal/services"

	"bitbucket.org/fyscal/be-commons/pkg/log"
)

const (
	QueryParamLimit = "limit"

	PathParamFeatureID = "feature_id"
	PathParamEntityID  = "entity_id"
	PathParamApiID     = "api_id"
	PathParamTeamID    = "team_id"

	MaxPaginationLimit = 100
)

type ControllerAccess struct {
	Cfg      *config.Config
	Logger   log.Logger
	Services *services.Services
}
