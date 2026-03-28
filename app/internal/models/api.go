package models

import (
	"time"

	"gorm.io/gorm"
)

type Api struct {
	ID          int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	Endpoint    string         `gorm:"type:varchar(512);not null" json:"endpoint"`
	HttpMethod  string         `gorm:"type:varchar(16);not null" json:"http_method"`
	Protocol    string         `gorm:"type:varchar(16);default:'HTTP'" json:"protocol"`
	ServiceID   int64          `gorm:"type:bigint;not null" json:"service_id"`
	IsInternal  bool           `gorm:"default:false;index:idx_apis_is_internal" json:"is_internal"`
	Description string         `gorm:"type:text" json:"description"`
	CreatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"default:NULL" json:"deleted_at"`
}

func (Api) TableName() string {
	return "apis"
}
