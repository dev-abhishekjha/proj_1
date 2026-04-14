package controllers

import (
	"app/ontology/internal/response"

	helloService "bitbucket.org/fyscal/be-proto/go-proto/boiler_plate/rpc"
	"github.com/gin-gonic/gin"
)

type ControllerHealth struct {
	helloService.UnimplementedHelloServiceServer
	Access *ControllerAccess
}

type ControllerHealthMethods interface {
	CheckHealth(ctx *gin.Context)
}

func NewControllerHealth(access *ControllerAccess) *ControllerHealth {
	return &ControllerHealth{
		Access: access,
	}
}

func (c *ControllerHealth) CheckHealth(ctx *gin.Context) {
	msg := c.Access.Services.Health.ServiceHealth()
	response.SendApiResponseV1(ctx, &gin.H{
		"code":    response.APISuccessCode,
		"message": msg,
	}, nil)
}
