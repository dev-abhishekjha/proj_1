package models

import (
	"time"
)

type EntityTransition struct {
	ID                   int64     `gorm:"primaryKey;autoIncrement" json:"id"`
	FromEntityID         int64     `gorm:"not null;index:idx_entity_transitions_from_entity_id" json:"from_entity_id"`
	ToEntityID           int64     `gorm:"not null;index:idx_entity_transitions_to_entity_id" json:"to_entity_id"`
	ConditionDescription string    `gorm:"type:text" json:"condition_description"`
	ConditionExpression  string    `gorm:"type:text" json:"condition_expression"`
	TransitionType       string    `gorm:"type:varchar(64);index:idx_entity_transitions_transition_type" json:"transition_type"`
	CreatedAt            time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`

	FromEntity Entity `gorm:"foreignKey:FromEntityID" json:"from_entity,omitempty"`
	ToEntity   Entity `gorm:"foreignKey:ToEntityID" json:"to_entity,omitempty"`
}

func (EntityTransition) TableName() string {
	return "entity_transitions"
}
