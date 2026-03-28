package middlewares

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

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
		cache := m.Access.Cache
		log := m.Access.Logger
		ctx := c.Request.Context()
		idempotencyKey := c.GetHeader(string(global.XIdempotencyKey))
		timestamp := time.Now().Unix()

		if idempotencyKey == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"code":    "IDEMPOTENCY_KEY_REQUIRED",
				"message": "Idempotency-Key header is required",
			})
			c.Abort()
			return
		}

		cacheKeyForIdempotency := fmt.Sprintf("idmp:%s:%d:%s", cacheKeyPrefix, timestamp, idempotencyKey)

		val, err := cache.Get(ctx, cacheKeyForIdempotency, "")
		if err != nil {
			log.Errorf("Error getting idempotency key from cache: %v", err)
			c.JSON(http.StatusBadRequest, gin.H{
				"code":    "REDIS_ERROR",
				"message": "Error getting idempotency key from cache",
			})
			c.Abort()
			return
		}

		if val == "" {
			w := &responseBodyWriter{body: &bytes.Buffer{}, ResponseWriter: c.Writer}
			c.Writer = w
			c.Next()
			if c.Writer.Status() != http.StatusOK {
				return
			}
			response := w.body.String()
			err := cache.Set(ctx, cacheKeyForIdempotency, response, 6*time.Hour)
			if err != nil {
				return
			}
		} else {
			// convert string val into json
			var jsonVal interface{}
			err = json.Unmarshal([]byte(val), &jsonVal)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"code":    "IDEMPOTENCY_DATA_ERROR",
					"message": "Error parsing idempotency data from cache",
				})
				c.Abort()
			}
			c.JSON(http.StatusOK, jsonVal)
			c.Abort()
			return
		}
	}
}
