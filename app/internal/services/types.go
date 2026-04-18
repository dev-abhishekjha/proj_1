package services

import (
	"app/Saranam/internal/config"
	"app/Saranam/internal/repositories"
	"app/Saranam/pkg/db"
	"app/Saranam/pkg/log"
)

type ServiceAccess struct {
	Cfg          *config.Config
	Db           *db.Store
	Logger       log.Logger
	Repositories repositories.Repositories
}
