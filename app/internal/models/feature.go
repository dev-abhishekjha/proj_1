package models

import (
	"time"

	"gorm.io/gorm"
)

type Feature struct {
	ID          int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	Code        string         `gorm:"type:varchar(32);not null;uniqueIndex" json:"code"`
	Name        string         `gorm:"type:varchar(64);not null;index:idx_features_name" json:"name"`
	Description string         `gorm:"type:text" json:"description"`
	IsActive    bool           `gorm:"default:true;index:idx_features_is_active" json:"is_active"`
	CreatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"default:NULL" json:"deleted_at"`
}

func (Feature) TableName() string {
	return "features"
}
