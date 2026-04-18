package controllers

import (
	"app/Saranam/internal/config"
	"app/Saranam/internal/services"
	"app/Saranam/pkg/log"
)

type Controllers struct {
	Health *ControllerHealth
}

func NewControllers(cfg *config.Config, logger log.Logger, services *services.Services) *Controllers {
	access := &ControllerAccess{
		Cfg:      cfg,
		Logger:   logger,
		Services: services,
	}
	return &Controllers{
		Health: NewControllerHealth(access),
	}
}
