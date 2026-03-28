package models

// EntityInstance represents a running instance of an entity within a feature instance in ClickHouse
type EntityInstance struct {
	ID                string `gorm:"column:id" json:"id"`
	FeatureInstanceID string `gorm:"column:feature_instance_id" json:"feature_instance_id"`
	EntityID          int64  `gorm:"column:entity_id" json:"entity_id"`
	Status            string `gorm:"column:status;type:LowCardinality(String)" json:"status"`
	StartedAt         int64  `gorm:"column:started_at" json:"started_at"`
	CompletedAt       *int64 `gorm:"column:completed_at" json:"completed_at,omitempty"`
	CreatedAt         int64  `gorm:"column:created_at" json:"created_at"`
}

func (EntityInstance) TableName() string {
	return "entity_instances"
}
