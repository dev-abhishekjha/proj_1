package middlewares

import (
	"app/ontology/internal/clients"
	"app/ontology/internal/config"
	"app/ontology/internal/repositories"

	"bitbucket.org/fyscal/be-commons/pkg/db"
	"bitbucket.org/fyscal/be-commons/pkg/log"
	"bitbucket.org/fyscal/be-commons/pkg/middlewares"
)

type Middlewares struct {
	Idempotency MiddlewareIdempotencyMethods
	Scopes      middlewares.MiddlewareScopesMethods
	Cors        MiddlewareCorsMethods
	AuditLogs   middlewares.MiddlewareAuditLogMethods
}

func NewMiddlewares(cfg *config.Config, db *db.Store, r *repositories.Repositories, cs db.CacheStoreMethods, l log.Logger, c *clients.Clients) *Middlewares {
	access := &MiddlewareAccess{
		Cfg:          cfg,
		Db:           db,
		Cache:        cs,
		Logger:       l,
		Repositories: *r,
		Clients:      c,
	}
	return &Middlewares{
		Idempotency: NewMiddlewareIdempotency(access),
		Scopes:      middlewares.NewMiddlewareScopes(l),
		Cors:        NewMiddlewareCors(access),
		AuditLogs:   middlewares.NewMiddlewareAuditLog(l, c.ClientSqs, cfg.AppName, cfg.FeatureFlags.EnableAuditLog),
	}
}
