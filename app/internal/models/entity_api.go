package models

type EntityApi struct {
	ID       int64 `gorm:"primaryKey;autoIncrement" json:"id"`
	EntityID int64 `gorm:"not null;index:idx_entity_apis_entity_id" json:"entity_id"`
	ApiID    int64 `gorm:"not null;index:idx_entity_apis_api_id" json:"api_id"`

	Entity Entity `gorm:"foreignKey:EntityID" json:"entity,omitempty"`
	Api    Api    `gorm:"foreignKey:ApiID" json:"api,omitempty"`
}

func (EntityApi) TableName() string {
	return "entity_apis"
}
