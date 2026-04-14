package middlewares

import (
	"app/ontology/internal/config"
	"app/ontology/internal/repositories"
)

type Middlewares struct {
	Idempotency MiddlewareIdempotencyMethods
	Cors        MiddlewareCorsMethods
}

func NewMiddlewares(cfg *config.Config, r *repositories.Repositories) *Middlewares {
	access := &MiddlewareAccess{
		Cfg:          cfg,
		Repositories: *r,
	}
	return &Middlewares{
		Idempotency: NewMiddlewareIdempotency(access),
		Cors:        NewMiddlewareCors(access),
	}
}
