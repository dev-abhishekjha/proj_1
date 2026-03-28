package models

// ServiceDeployment represents a deployment record in ClickHouse
type ServiceDeployment struct {
	ID          string `gorm:"column:id" json:"id"`
	ServiceID   int64  `gorm:"column:service_id" json:"service_id"`
	Environment string `gorm:"column:environment;type:LowCardinality(String)" json:"environment"`
	CommitHash  string `gorm:"column:commit_hash" json:"commit_hash"`
	Version     string `gorm:"column:version" json:"version"`
	DeployedAt  int64  `gorm:"column:deployed_at" json:"deployed_at"`
	CreatedAt   int64  `gorm:"column:created_at" json:"created_at"`
	UpdatedAt   int64  `gorm:"column:updated_at" json:"updated_at"`
}

func (ServiceDeployment) TableName() string {
	return "service_deployments"
}
