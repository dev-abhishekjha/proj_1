package models

import (
	"time"

	"gorm.io/gorm"
)

type Entity struct {
	ID           int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	FeatureID    *int64         `gorm:"default:NULL;index:idx_entities_feature_id" json:"feature_id"`
	Code         string         `gorm:"type:varchar(32);not null;uniqueIndex" json:"code"`
	Name         string         `gorm:"type:varchar(64);not null;index:idx_entities_name" json:"name"`
	Description  string         `gorm:"type:text" json:"description"`
	DisplayOrder int            `gorm:"default:0" json:"display_order"`
	IsStart      bool           `gorm:"default:false;index:idx_entities_is_start" json:"is_start"`
	IsTerminal   bool           `gorm:"default:false;index:idx_entities_is_terminal" json:"is_terminal"`
	CreatedAt    time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"default:NULL" json:"deleted_at"`

	Feature Feature `gorm:"foreignKey:FeatureID" json:"feature,omitempty"`
}

func (Entity) TableName() string {
	return "entities"
}
