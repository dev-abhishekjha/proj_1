package app

import (
	"app/Saranam/cmd/app/middlewares"

	"github.com/gin-gonic/gin"
)

const (
	ServiceNameGroupPrefix    = "/Saranam"
	ServiceNameProtectedApiV1 = ServiceNameGroupPrefix + ProtectedApiV1
	ServiceNamePrivateApiV1   = ServiceNameGroupPrefix + PrivateApiV1
	ServiceNamePublicApiV1    = ServiceNameGroupPrefix + PublicApiV1
)

func (app *App) addBaseRoutes(router *gin.Engine, middlewares *middlewares.Middlewares) {
	controller := app.controllers
	v1Public := router.Group(ServiceNamePublicApiV1)
	{
		v1Public.GET("/health",

			controller.Health.CheckHealth)
	}

	v1Private := router.Group(ServiceNamePrivateApiV1)
	{
		v1Private.GET("/health", controller.Health.CheckHealth)
	}
}
