package services

import (
	"app/ontology/internal/clients"
	"app/ontology/internal/config"
	"app/ontology/internal/repositories"

	"bitbucket.org/fyscal/be-commons/pkg/db"
	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type ServiceAccess struct {
	Cfg          *config.Config
	Db           *db.Store
	Cache        db.CacheStoreMethods
	Logger       log.Logger
	Clients      *clients.Clients
	Repositories repositories.Repositories
}

const (
	ParamName         = "name"
	ParamDescription  = "description"
	ParamCode         = "code"
	ParamDisplayOrder = "display_order"
	ParamIsStart      = "is_start"
	ParamIsTerminal   = "is_terminal"
	ParamFeatureID    = "feature_id"
	ParamIsActive     = "is_active"
)
