package services

import (
	"app/ontology/internal/config"
	"app/ontology/internal/repositories"

	"bitbucket.org/fyscal/be-commons/pkg/db"
	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type Services struct {
	Health ServiceHealthMethods
}

func NewServices(cfg *config.Config, db *db.Store, r *repositories.Repositories, cs db.CacheStoreMethods, l log.Logger) *Services {
	access := &ServiceAccess{
		Cfg:          cfg,
		Db:           db,
		Cache:        cs,
		Logger:       l,
		Repositories: *r,
	}

	return &Services{
		Health: NewServiceHealth(access),
	}
}
