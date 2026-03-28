package models

import (
	"time"

	"gorm.io/gorm"
)

type Team struct {
	ID           int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string         `gorm:"type:varchar(64);not null;uniqueIndex:idx_teams_name" json:"name"`
	SlackChannel string         `gorm:"type:varchar(128)" json:"slack_channel"`
	OncallEmail  string         `gorm:"type:varchar(255)" json:"oncall_email"`
	CreatedAt    time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"default:NULL" json:"deleted_at"`

	ServiceTeamRoles []ServiceTeamRole `gorm:"foreignKey:TeamID" json:"service_team_roles,omitempty"`
}

func (Team) TableName() string {
	return "teams"
}
