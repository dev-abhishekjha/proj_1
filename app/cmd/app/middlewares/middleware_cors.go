package middlewares

import (
	"github.com/gin-gonic/gin"
)

type MiddlewareCors struct {
	Access *MiddlewareAccess
}

type MiddlewareCorsMethods interface {
	Handler() gin.HandlerFunc
}

func NewMiddlewareCors(access *MiddlewareAccess) MiddlewareCorsMethods {
	return &MiddlewareCors{
		Access: access,
	}
}

func (m *MiddlewareCors) Handler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if m.Access.Cfg.Environment == "local" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, x-scope, X-Scope")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

			if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(204)
				return
			}
		}

		c.Next()
	}
}
