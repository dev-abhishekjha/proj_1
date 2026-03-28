package models

import (
	"time"

	"gorm.io/gorm"
)

type Service struct {
	ID               int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	Code             string         `gorm:"type:varchar(32);not null;uniqueIndex" json:"code"`
	Name             string         `gorm:"type:varchar(64);not null;index:idx_services_name" json:"name"`
	Description      string         `gorm:"type:text" json:"description"`
	RepositoryURL    string         `gorm:"type:varchar(512)" json:"repository_url"`
	CriticalityLevel string         `gorm:"type:varchar(32);index:idx_services_criticality_level" json:"criticality_level"`
	CreatedAt        time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt        time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"default:NULL" json:"deleted_at"`

	ServiceTeamRoles []ServiceTeamRole `gorm:"foreignKey:ServiceID" json:"service_team_roles,omitempty"`
}

func (Service) TableName() string {
	return "services"
}
