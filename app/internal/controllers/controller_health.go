package controllers

import (
	"app/ontology/internal/response"
	"context"

	helloService "bitbucket.org/fyscal/be-proto/go-proto/boiler_plate/rpc"
	"github.com/gin-gonic/gin"
)

type ControllerHealth struct {
	helloService.UnimplementedHelloServiceServer
	Access *ControllerAccess
}

type ControllerHealthMethods interface {
	SayHello(ctx context.Context, req *helloService.RequestHelloWorld) (*helloService.ResponseHelloWorld, error)
	CheckHealth(ctx *gin.Context)
}

func NewControllerHealth(access *ControllerAccess) *ControllerHealth {
	return &ControllerHealth{
		Access: access,
	}
}

func (c *ControllerHealth) CheckHealth(ctx *gin.Context) {
	msg := c.Access.Services.Health.ServiceHealth()
	c.Access.Services.Health.SendNotification(ctx)
	response.SendApiResponseV1(ctx, &gin.H{
		"code":    response.APISuccessCode,
		"message": msg,
	}, nil)
}

func (c *ControllerHealth) SayHello(ctx context.Context, req *helloService.RequestHelloWorld) (*helloService.ResponseHelloWorld, error) {
	// Return errors within the response object to facilitate better logging and monitoring.
	if req.Name == "" {
		return &helloService.ResponseHelloWorld{
			Code:    string(response.InvalidParams),
			Message: "Name is required",
		}, nil
	}

	// Call service layer

	return &helloService.ResponseHelloWorld{
		Message: "hello " + req.Name,
		Code:    response.APISuccessCode,
	}, nil
}
