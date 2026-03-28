package models

// FeatureInstance represents a running instance of a feature in ClickHouse
type FeatureInstance struct {
	ID          string `gorm:"column:id" json:"id"`
	FeatureID   int64  `gorm:"column:feature_id" json:"feature_id"`
	Status      string `gorm:"column:status;type:LowCardinality(String)" json:"status"`
	StartedAt   int64  `gorm:"column:started_at" json:"started_at"`
	CompletedAt *int64 `gorm:"column:completed_at" json:"completed_at,omitempty"`
	CreatedAt   int64  `gorm:"column:created_at" json:"created_at"`
}

func (FeatureInstance) TableName() string {
	return "feature_instances"
}
