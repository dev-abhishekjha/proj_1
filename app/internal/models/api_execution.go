package models

// ApiExecution represents a single API execution record in ClickHouse
type ApiExecution struct {
	ID                  string `gorm:"column:id" json:"id"`
	EntityInstanceID    string `gorm:"column:entity_instance_id" json:"entity_instance_id"`
	ServiceDeploymentID string `gorm:"column:service_deployment_id" json:"service_deployment_id"`

	// Identity / auth context
	OauthClientID  *string `gorm:"column:oauth_client_id" json:"oauth_client_id,omitempty"`
	UserID         *string `gorm:"column:user_id" json:"user_id,omitempty"`
	UserUID        *string `gorm:"column:user_uid" json:"user_uid,omitempty"`
	OrganizationID *string `gorm:"column:organization_id" json:"organization_id,omitempty"`
	TokenID        *string `gorm:"column:token_id" json:"token_id,omitempty"`

	// Request metadata
	RequestTimestamp  int64    `gorm:"column:request_timestamp" json:"request_timestamp"`
	RequestDurationMs int32    `gorm:"column:request_duration_ms" json:"request_duration_ms"`
	SourceIP          *string  `gorm:"column:source_ip" json:"source_ip,omitempty"`
	RequestID         *string  `gorm:"column:request_id" json:"request_id,omitempty"`
	CorrelationID     *string  `gorm:"column:correlation_id" json:"correlation_id,omitempty"`
	TraceID           *string  `gorm:"column:trace_id" json:"trace_id,omitempty"`
	SpanID            *string  `gorm:"column:span_id" json:"span_id,omitempty"`
	Host              *string  `gorm:"column:host" json:"host,omitempty"`
	Latitude          *float64 `gorm:"column:latitude" json:"latitude,omitempty"`
	Longitude         *float64 `gorm:"column:longitude" json:"longitude,omitempty"`

	// Device context
	DeviceID      *string `gorm:"column:device_id" json:"device_id,omitempty"`
	PlatformOS    *string `gorm:"column:platform_os;type:LowCardinality(Nullable(String))" json:"platform_os,omitempty"`
	AppVersion    *string `gorm:"column:app_version" json:"app_version,omitempty"`
	UserAgent     *string `gorm:"column:user_agent" json:"user_agent,omitempty"`
	RiskSessionID *string `gorm:"column:risk_session_id" json:"risk_session_id,omitempty"`
	DeviceModel   *string `gorm:"column:device_model" json:"device_model,omitempty"`

	// Auth details
	AuthScheme  *string `gorm:"column:auth_scheme;type:LowCardinality(Nullable(String))" json:"auth_scheme,omitempty"`
	TokenType   *string `gorm:"column:token_type;type:LowCardinality(Nullable(String))" json:"token_type,omitempty"`
	TokenScopes *string `gorm:"column:token_scopes" json:"token_scopes,omitempty"`

	// Response details
	HttpStatus        int32   `gorm:"column:http_status" json:"http_status"`
	AppErrorCode      *string `gorm:"column:app_error_code" json:"app_error_code,omitempty"`
	ErrorMessage      *string `gorm:"column:error_message" json:"error_message,omitempty"`
	ResponseSizeBytes int32   `gorm:"column:response_size_bytes" json:"response_size_bytes"`

	// Metadata
	CreatedAt int64 `gorm:"column:created_at" json:"created_at"`
}

func (ApiExecution) TableName() string {
	return "api_executions"
}
