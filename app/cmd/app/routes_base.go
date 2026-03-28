package app

import (
	"app/ontology/cmd/app/middlewares"

	"github.com/gin-gonic/gin"
)

const (
	ScopeEntitiesView   = "entities:view"
	ScopeEntitiesManage = "entities:manage"
	ScopeServicesView   = "services:view"
	ScopeServicesManage = "services:manage"
	ScopeFeaturesView   = "features:view"
	ScopeFeaturesManage = "features:manage"
	ScopeTeamsView      = "teams:view"
	ScopeTeamsManage    = "teams:manage"
	ScopeApisView       = "apis:view"
	ScopeApisManage     = "apis:manage"
	ScopeKpisView       = "kpis:view"
	ScopeKpisManage     = "kpis:manage"
)

const (
	ServiceNameGroupPrefix    = "/ontology"
	ServiceNameProtectedApiV1 = ServiceNameGroupPrefix + ProtectedApiV1
	ServiceNamePrivateApiV1   = ServiceNameGroupPrefix + PrivateApiV1
	ServiceNamePublicApiV1    = ServiceNameGroupPrefix + PublicApiV1
)

func (app *App) addBaseRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Public := router.Group(ServiceNamePublicApiV1)
	{
		v1Public.GET("/health",
			middlewares.Idempotency.WithIdempotency("health"),

			controller.Health.CheckHealth)
	}

	v1Private := router.Group(ServiceNamePrivateApiV1)
	{
		v1Private.GET("/health", controller.Health.CheckHealth)
	}
}

func (app *App) addServiceRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Protected := router.Group(ServiceNameProtectedApiV1)
	{
		v1Protected.GET("/services", middlewares.Scopes.HasAnyOneScope(ScopeServicesView, ScopeServicesManage), controller.Service.GetAllServices)
		v1Protected.GET("/services/deployments", middlewares.Scopes.HasAnyOneScope(ScopeServicesView, ScopeServicesManage), controller.Service.GetServiceDeployments)
	}
}

func (app *App) addTeamRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Protected := router.Group(ServiceNameProtectedApiV1)
	{
		v1Protected.GET("/teams", middlewares.Scopes.HasAnyOneScope(ScopeTeamsView, ScopeTeamsManage), controller.Team.GetAllTeams)
		v1Protected.GET("/teams/feature/:feature_id", middlewares.Scopes.HasAnyOneScope(ScopeTeamsView, ScopeTeamsManage), controller.Team.GetFeatureTeams)
		v1Protected.POST("/teams",
			middlewares.Scopes.HasAnyOneScope(ScopeTeamsManage),
			controller.Team.CreateTeam)
		v1Protected.PATCH("/teams/:team_id",
			middlewares.Scopes.HasAnyOneScope(ScopeTeamsManage),
			controller.Team.UpdateTeam)
	}
}

func (app *App) addFeatureRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Protected := router.Group(ServiceNameProtectedApiV1)
	{
		v1Protected.GET("/features", middlewares.Scopes.HasAnyOneScope(ScopeFeaturesView, ScopeFeaturesManage), controller.Feature.GetAllFeatures)
		v1Protected.POST("/features", middlewares.AuditLogs.AuditLogMiddleware(), middlewares.Scopes.HasAnyOneScope(ScopeFeaturesManage), controller.Feature.CreateFeature)
		v1Protected.PATCH("/features/:feature_id", middlewares.AuditLogs.AuditLogMiddleware(), middlewares.Scopes.HasAnyOneScope(ScopeFeaturesManage), controller.Feature.UpdateFeature)
		v1Protected.GET("/features/instances", middlewares.Scopes.HasAnyOneScope(ScopeFeaturesView, ScopeFeaturesManage), controller.Feature.GetFeatureInstances)
		v1Protected.GET("/features/:feature_id/metrics", middlewares.Scopes.HasAnyOneScope(ScopeFeaturesView, ScopeFeaturesManage), controller.Feature.GetFeatureMetrics)
	}
}

func (app *App) addApiRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Protected := router.Group(ServiceNameProtectedApiV1)
	{
		v1Protected.GET("/apis", middlewares.Scopes.HasAnyOneScope(ScopeApisView, ScopeApisManage), controller.Api.GetAllApis)
		v1Protected.GET("/apis/:api_id/metrics", middlewares.Scopes.HasAnyOneScope(ScopeApisView, ScopeApisManage), controller.Api.GetApiMetrics)
	}
}

func (app *App) addEntityRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1 := router.Group(ServiceNameProtectedApiV1)
	{
		v1.GET("/entities", middlewares.Scopes.HasAnyOneScope(ScopeEntitiesView, ScopeEntitiesManage), controller.Entity.GetEntities)
		v1.POST("/entities", middlewares.AuditLogs.AuditLogMiddleware(), middlewares.Scopes.HasAnyOneScope(ScopeEntitiesManage), controller.Entity.CreateEntity)
		v1.PATCH("/entities/:entity_id", middlewares.AuditLogs.AuditLogMiddleware(), middlewares.Scopes.HasAnyOneScope(ScopeEntitiesManage), controller.Entity.UpdateEntity)
		v1.GET("/entities/:entity_id/metrics", middlewares.Scopes.HasAnyOneScope(ScopeEntitiesView, ScopeEntitiesManage), controller.Entity.GetEntityMetrics)
		v1.GET("/entities/transitions", middlewares.Scopes.HasAnyOneScope(ScopeEntitiesView, ScopeEntitiesManage), controller.Entity.GetEntityTransitions)
		v1.GET("/entities/:entity_id/apis", middlewares.Scopes.HasAnyOneScope(ScopeEntitiesView, ScopeEntitiesManage), controller.Entity.GetEntityApis)
	}
}

func (app *App) addKpiRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Protected := router.Group(ServiceNameProtectedApiV1)
	{
		v1Protected.GET("/kpis", middlewares.Scopes.HasAnyOneScope(ScopeKpisView, ScopeKpisManage), controller.Kpi.GetAllKpis)
		v1Protected.GET("/kpi-relationships", middlewares.Scopes.HasAnyOneScope(ScopeKpisView, ScopeKpisManage), controller.Kpi.GetAllKpiRelationships)
	}
}
