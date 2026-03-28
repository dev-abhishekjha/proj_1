package models

// FeatureTeamRole represents the feature-team role mapping in ClickHouse
// Derived from Postgres via CDC (Debezium -> Kafka -> ClickHouse)
// Source of truth remains in Postgres
type FeatureTeamRole struct {
	FeatureID  int64  `gorm:"column:feature_id" json:"feature_id"`
	TeamID     int64  `gorm:"column:team_id" json:"team_id"`
	Role       string `gorm:"column:role;type:LowCardinality(String)" json:"role"`
	AssignedAt int64  `gorm:"column:assigned_at" json:"assigned_at"`
}

func (FeatureTeamRole) TableName() string {
	return "feature_team_roles"
}
