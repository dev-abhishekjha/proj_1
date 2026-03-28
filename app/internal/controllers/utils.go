package controllers

import (
	"strconv"
	"time"
)

func parseDeploymentTime(raw string) (int64, error) {
	if unix, err := strconv.ParseInt(raw, 10, 64); err == nil {
		return unix, nil
	}

	parsed, err := time.Parse(time.RFC3339, raw)
	if err != nil {
		return 0, err
	}

	return parsed.Unix(), nil
}
