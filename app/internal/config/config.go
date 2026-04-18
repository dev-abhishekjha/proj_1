package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type DatabaseConfig struct {
	MasterDatabaseDsn string `yaml:"master_database_dsn"`
	SlaveDatabaseDsn  string `yaml:"slave_database_dsn"`
}

// Config represents an application configuration.
type Config struct {
	ServerPort      int            `yaml:"ServerPort"`
	GrpcPort        int            `yaml:"GrpcPort"`
	AppName         string         `yaml:"AppName"`
	AppVersion      string         `yaml:"AppVersion"`
	BaseUrl         string         `yaml:"BaseUrl"`
	Environment     string         `yaml:"Environment"`
	OtlpExporterUrl string         `yaml:"OtlpExporterUrl"`
	Database        DatabaseConfig `yaml:"Database"`
}

// Load returns an application configuration which is populated from the given configuration file and environment variables.
func Load(file string) (*Config, error) {
	// default config
	var c Config

	// load from YAML config file
	bytes, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}

	fmt.Printf("trying to load config from file: %s\n", file)

	if err = yaml.Unmarshal(bytes, &c); err != nil {
		return nil, err
	}

	fmt.Printf("loaded config from file: %s\n", file)
	return &c, err
}
