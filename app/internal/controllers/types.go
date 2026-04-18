package controllers

import (
	"app/Saranam/internal/config"
	"app/Saranam/internal/services"
	"app/Saranam/pkg/log"
)

type ControllerAccess struct {
	Cfg      *config.Config
	Logger   log.Logger
	Services *services.Services
}
