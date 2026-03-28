package models

import "time"

// EntityMetric represents aggregated entity metrics in ClickHouse (populated by entity_metrics_mv)
type EntityMetric struct {
	EntityID      int64     `gorm:"column:entity_id" json:"entity_id"`
	WindowStart   time.Time `gorm:"column:window_start" json:"window_start"`
	WindowMinutes int32     `gorm:"column:window_minutes" json:"window_minutes"`
	TotalCount    int64     `gorm:"column:total_count" json:"total_count"`
	SuccessRate   float64   `gorm:"column:success_rate" json:"success_rate"`
	FailureRate   float64   `gorm:"column:failure_rate" json:"failure_rate"`
	P50DurationMs float64   `gorm:"column:p50_duration_ms" json:"p50_duration_ms"`
	P95DurationMs float64   `gorm:"column:p95_duration_ms" json:"p95_duration_ms"`
	P99DurationMs float64   `gorm:"column:p99_duration_ms" json:"p99_duration_ms"`
	CreatedAt     int64     `gorm:"column:created_at" json:"created_at"`
}

func (EntityMetric) TableName() string {
	return "entity_metrics"
}
