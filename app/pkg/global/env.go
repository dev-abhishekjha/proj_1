package global

// Environment represents a deployment environment.
type Environment string

const (
	LocalEnv Environment = "local"
	StageEnv Environment = "stg"
	ProdEnv  Environment = "production"
)
