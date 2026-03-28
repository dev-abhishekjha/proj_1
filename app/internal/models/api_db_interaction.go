package models

// ApiDbInteraction represents a single database interaction within an API execution in ClickHouse
type ApiDbInteraction struct {
	ID              string  `gorm:"column:id" json:"id"`
	ApiExecutionID  string  `gorm:"column:api_execution_id" json:"api_execution_id"`
	DatabaseType    string  `gorm:"column:database_type;type:LowCardinality(String)" json:"database_type"`
	DbTableName     string  `gorm:"column:table_name" json:"table_name"`
	OperationType   string  `gorm:"column:operation_type;type:LowCardinality(String)" json:"operation_type"`
	SqlQuery        string  `gorm:"column:sql_query" json:"sql_query"`
	QueryParameters *string `gorm:"column:query_parameters" json:"query_parameters,omitempty"`
	RowsAffected    int32   `gorm:"column:rows_affected" json:"rows_affected"`
	DurationMs      int32   `gorm:"column:duration_ms" json:"duration_ms"`
	ErrorMessage    *string `gorm:"column:error_message" json:"error_message,omitempty"`
	CreatedAt       int64   `gorm:"column:created_at" json:"created_at"`
}

func (ApiDbInteraction) TableName() string {
	return "api_db_interactions"
}
