package models

import (
	"time"
)

type Kpi struct {
	ID          int64     `gorm:"primaryKey;autoIncrement" json:"id"`
	Code        string    `gorm:"type:varchar(32);not null;uniqueIndex" json:"code"`
	Name        string    `gorm:"type:varchar(64);not null;index:idx_kpis_name" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	MetricType  string    `gorm:"type:varchar(64);not null;index:idx_kpis_metric_type" json:"metric_type"`
	Unit        string    `gorm:"type:varchar(32)" json:"unit"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`

	KpiRelationships []KpiRelationship `gorm:"foreignKey:KpiID" json:"kpi_relationships,omitempty"`
}

func (Kpi) TableName() string {
	return "kpis"
}
