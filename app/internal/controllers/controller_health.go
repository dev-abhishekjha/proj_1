package controllers

import (
	"app/Saranam/internal/response"

	"github.com/gin-gonic/gin"
)

type ControllerHealth struct {
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
