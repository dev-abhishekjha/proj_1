package services

import (
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
	Repositories repositories.Repositories
}
