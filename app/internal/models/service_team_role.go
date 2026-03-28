package models

import (
	"time"
)

type ServiceTeamRole struct {
	ID         int64      `gorm:"primaryKey;autoIncrement" json:"id"`
	ServiceID  int64      `gorm:"not null;index:idx_service_team_roles_service_id" json:"service_id"`
	TeamID     int64      `gorm:"not null;index:idx_service_team_roles_team_id" json:"team_id"`
	Role       string     `gorm:"type:varchar(64);not null;index:idx_service_team_roles_role" json:"role"`
	AssignedAt time.Time  `gorm:"default:CURRENT_TIMESTAMP" json:"assigned_at"`
	RevokedAt  *time.Time `gorm:"default:NULL" json:"revoked_at,omitempty"`

	Service Service `gorm:"foreignKey:ServiceID" json:"service,omitempty"`
	Team    Team    `gorm:"foreignKey:TeamID" json:"team,omitempty"`
}

func (ServiceTeamRole) TableName() string {
	return "service_team_roles"
}
