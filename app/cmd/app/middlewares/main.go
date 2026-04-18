package middlewares

import (
	"app/Saranam/internal/config"
	"app/Saranam/internal/repositories"
)

type Middlewares struct {
	Cors MiddlewareCorsMethods
}

func NewMiddlewares(cfg *config.Config, r *repositories.Repositories) *Middlewares {
	access := &MiddlewareAccess{
		Cfg:          cfg,
		Repositories: *r,
	}
	return &Middlewares{
		Cors: NewMiddlewareCors(access),
	}
}
