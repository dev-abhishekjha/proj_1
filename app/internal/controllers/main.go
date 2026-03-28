package controllers

import (
	"app/ontology/internal/config"
	"app/ontology/internal/services"

	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type Controllers struct {
	Health  *ControllerHealth
	Entity  ControllerEntityMethods
	Service ControllerServiceMethods
	Team    ControllerTeamMethods
	Feature ControllerFeatureMethods
	Api     ControllerApiMethods
	Kpi     ControllerKpiMethods
}

func NewControllers(cfg *config.Config, logger log.Logger, services *services.Services) *Controllers {
	access := &ControllerAccess{
		Cfg:      cfg,
		Logger:   logger,
		Services: services,
	}
	return &Controllers{
		Health:  NewControllerHealth(access),
		Entity:  NewControllerEntity(access),
		Service: NewControllerService(access),
		Team:    NewControllerTeam(access),
		Feature: NewControllerFeature(access),
		Api:     NewControllerApi(access),
		Kpi:     NewControllerKpi(access),
	}
}
