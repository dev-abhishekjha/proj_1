package middlewares

import (
	"app/ontology/internal/clients"
	"app/ontology/internal/config"
	"app/ontology/internal/repositories"

	"bitbucket.org/fyscal/be-commons/pkg/db"
	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type MiddlewareAccess struct {
	Cfg          *config.Config
	Db           *db.Store
	Cache        db.CacheStoreMethods
	Logger       log.Logger
	Clients      *clients.Clients
	Repositories repositories.Repositories
}
