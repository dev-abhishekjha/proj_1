package middlewares

import (
	"app/Saranam/internal/config"
	"app/Saranam/internal/repositories"
)

type MiddlewareAccess struct {
	Cfg          *config.Config
	Repositories repositories.Repositories
}
