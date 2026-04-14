package controllers

import (
	"app/ontology/internal/config"
	"app/ontology/internal/services"

	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type ControllerAccess struct {
	Cfg      *config.Config
	Logger   log.Logger
	Services *services.Services
}
