package utils

import "strings"

func TrimAndValidateRequired(fields ...*string) bool {
	for _, field := range fields {
		if field == nil {
			return false
		}
		trimmed := strings.TrimSpace(*field)
		*field = trimmed
		if trimmed == "" {
			return false
		}
	}
	return true
}

func TrimAndValidateOptional(fields ...*string) bool {
	for _, field := range fields {
		if field == nil {
			continue
		}
		trimmed := strings.TrimSpace(*field)
		*field = trimmed
		if trimmed == "" {
			return false
		}
	}
	return true
}
