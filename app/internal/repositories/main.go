package repositories

import (
	"app/Saranam/pkg/db"
	"app/Saranam/pkg/log"
)

type Repositories struct {
	Health RepositoryHealthMethods
}

func NewRepositories(pos *db.Store, logger log.Logger) *Repositories {
	access := &RepositoryAccess{
		Db:     pos,
		Logger: logger,
	}

	return &Repositories{
		Health: NewRepositoryHealth(access),
	}
}
