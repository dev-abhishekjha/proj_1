package services

import (
	"app/Saranam/internal/config"
	"app/Saranam/internal/repositories"
	"app/Saranam/pkg/db"
	"app/Saranam/pkg/log"
)

type Services struct {
	Health ServiceHealthMethods
}

func NewServices(cfg *config.Config, store *db.Store, r *repositories.Repositories, l log.Logger) *Services {
	access := &ServiceAccess{
		Cfg:          cfg,
		Db:           store,
		Logger:       l,
		Repositories: *r,
	}

	return &Services{
		Health: NewServiceHealth(access),
	}
}
