package repositories

import (
	"app/Saranam/pkg/db"
	"app/Saranam/pkg/log"
)

type RepositoryAccess struct {
	Db     *db.Store
	Logger log.Logger
}
