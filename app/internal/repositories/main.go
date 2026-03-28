package repositories

import (
	"bitbucket.org/fyscal/be-commons/pkg/clickhouse"
	"bitbucket.org/fyscal/be-commons/pkg/db"
	"bitbucket.org/fyscal/be-commons/pkg/log"
)

type Repositories struct {
	Health  RepositoryHealthMethods
	Entity  RepositoryEntityMethods
	Service RepositoryServiceMethods
	Team    RepositoryTeamMethods
	Feature RepositoryFeatureMethods
	Api     RepositoryApiMethods
	Kpi     RepositoryKpiMethods
}

func NewRepositories(pos *db.Store, cacheDb db.CacheStoreMethods, logger log.Logger, fastCache db.DirtyCacheMethods, clickhouseDb *clickhouse.Store) *Repositories {
	access := &RepositoryAccess{
		Db:           pos,
		Cache:        cacheDb,
		Logger:       logger,
		FastCache:    fastCache,
		ClickHouseDb: clickhouseDb,
	}

	return &Repositories{
		Health:  NewRepositoryHealth(access),
		Entity:  NewRepositoryEntity(access),
		Service: NewRepositoryService(access),
		Team:    NewRepositoryTeam(access),
		Feature: NewRepositoryFeature(access),
		Api:     NewRepositoryApi(access),
		Kpi:     NewRepositoryKpi(access),
	}
}
