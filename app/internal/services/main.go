package services

import (
	"app/ontology/internal/clients"
	"app/ontology/internal/config"
	"app/ontology/internal/repositories"

	"bitbucket.org/fyscal/be-commons/pkg/db"
	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type Services struct {
	Health  ServiceHealthMethods
	Entity  ServiceEntityMethods
	Service ServiceServiceMethods
	Team    ServiceTeamMethods
	Feature ServiceFeatureMethods
	Api     ServiceApiMethods
	Kpi     ServiceKpiMethods
}

func NewServices(cfg *config.Config, db *db.Store, r *repositories.Repositories, cs db.CacheStoreMethods, l log.Logger, c *clients.Clients) *Services {
	access := &ServiceAccess{
		Cfg:          cfg,
		Db:           db,
		Cache:        cs,
		Logger:       l,
		Repositories: *r,
		Clients:      c,
	}

	return &Services{
		Health:  NewServiceHealth(access),
		Entity:  NewServiceEntity(access),
		Service: NewServiceService(access),
		Team:    NewServiceTeam(access),
		Feature: NewServiceFeature(access),
		Api:     NewServiceApi(access),
		Kpi:     NewServiceKpi(access),
	}
}
