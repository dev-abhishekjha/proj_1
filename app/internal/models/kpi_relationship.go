package models

import (
	"time"
)

type KpiRelationship struct {
	ID               int64      `gorm:"primaryKey;autoIncrement" json:"id"`
	KpiID            int64      `gorm:"not null;index:idx_kpis_relationships_kpi_id" json:"kpi_id"`
	RelationType     string     `gorm:"type:varchar(64);not null;index:idx_kpis_relationships_relation_type" json:"relation_type"`
	TargetType       string     `gorm:"type:varchar(64);not null;index:idx_kpis_relationships_target" json:"target_type"`
	TargetID         int64      `gorm:"not null;index:idx_kpis_relationships_target" json:"target_id"`
	Weight           float64    `gorm:"default:0" json:"weight"`
	WeightSetBy      string     `gorm:"type:varchar(64)" json:"weight_set_by"`
	WeightReviewedBy string     `gorm:"type:varchar(64)" json:"weight_reviewed_by"`
	WeightReviewedAt *time.Time `gorm:"default:NULL" json:"weight_reviewed_at,omitempty"`
	CreatedAt        time.Time  `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt        time.Time  `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`

	Kpi Kpi `gorm:"foreignKey:KpiID" json:"kpi,omitempty"`
}

func (KpiRelationship) TableName() string {
	return "kpis_relationships"
}
