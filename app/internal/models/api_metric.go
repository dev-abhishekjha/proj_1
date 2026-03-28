package models

import "time"

// ApiMetric represents aggregated API metrics in ClickHouse (populated by api_metrics_mv)
type ApiMetric struct {
	ApisDeploymentID string    `gorm:"column:apis_deployment_id" json:"apis_deployment_id"`
	WindowStart      time.Time `gorm:"column:window_start" json:"window_start"`
	WindowMinutes    int32     `gorm:"column:window_minutes" json:"window_minutes"`
	TotalCalls       int64     `gorm:"column:total_calls" json:"total_calls"`
	SuccessRate      float64   `gorm:"column:success_rate" json:"success_rate"`
	ErrorRate        float64   `gorm:"column:error_rate" json:"error_rate"`
	P50LatencyMs     float64   `gorm:"column:p50_latency_ms" json:"p50_latency_ms"`
	P95LatencyMs     float64   `gorm:"column:p95_latency_ms" json:"p95_latency_ms"`
	P99LatencyMs     float64   `gorm:"column:p99_latency_ms" json:"p99_latency_ms"`
	CreatedAt        int64     `gorm:"column:created_at" json:"created_at"`
	UpdatedAt        int64     `gorm:"column:updated_at" json:"updated_at"`
}

func (ApiMetric) TableName() string {
	return "api_metrics"
}
