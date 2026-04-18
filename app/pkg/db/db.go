package db

import (
	"app/Saranam/pkg/log"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Store wraps a GORM DB connection pair (master for writes, slave for reads).
type Store struct {
	Master *gorm.DB
	Slave  *gorm.DB
}

// NewStore opens master and slave Postgres connections and returns a Store.
// Pass the same DSN for both if you have a single-node setup.
func NewStore(l log.Logger, masterDSN, slaveDSN, appName string) (*Store, error) {
	gormCfg := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	}

	master, err := gorm.Open(postgres.Open(masterDSN), gormCfg)
	if err != nil {
		return nil, fmt.Errorf("db: failed to connect to master: %w", err)
	}

	slave, err := gorm.Open(postgres.Open(slaveDSN), gormCfg)
	if err != nil {
		return nil, fmt.Errorf("db: failed to connect to slave: %w", err)
	}

	l.Infof("db: connected to postgres (app: %s)", appName)

	return &Store{
		Master: master,
		Slave:  slave,
	}, nil
}
