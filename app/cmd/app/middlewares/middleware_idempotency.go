package middlewares

import (
	"bytes"
	"net/http"

	"bitbucket.org/fyscal/be-commons/pkg/global"
	"github.com/gin-gonic/gin"
)

type MiddlewareIdempotency struct {
	Access *MiddlewareAccess
}

type MiddlewareIdempotencyMethods interface {
	WithIdempotency(string) gin.HandlerFunc
}

func NewMiddlewareIdempotency(access *MiddlewareAccess) MiddlewareIdempotencyMethods {
	return &MiddlewareIdempotency{
		Access: access,
	}
}

type responseBodyWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (r responseBodyWriter) Write(b []byte) (int, error) {
	r.body.Write(b)
	return r.ResponseWriter.Write(b)
}

func (m MiddlewareIdempotency) WithIdempotency(cacheKeyPrefix string) gin.HandlerFunc {
	return func(c *gin.Context) {
		idempotencyKey := c.GetHeader(string(global.XIdempotencyKey))

		if idempotencyKey == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"code":    "IDEMPOTENCY_KEY_REQUIRED",
				"message": "Idempotency-Key header is required",
			})
			c.Abort()
			return
		}

	}
}
