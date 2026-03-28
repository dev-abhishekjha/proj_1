package response

import "net/http"

const (
	FeatureNotFound      ErrorCode = "FNF01"
	FeatureAlreadyExists ErrorCode = "FAE01"
	CreateFeatureFailed  ErrorCode = "CFF01"
	UpdateFeatureFailed  ErrorCode = "UFF01"
)

var (
	ErrFeatureNotFound = &ApplicationError{
		ErrorCode:    FeatureNotFound,
		ErrorMessage: "feature not found",
		HttpCode:     http.StatusNotFound,
	}
	ErrFeatureAlreadyExists = &ApplicationError{
		ErrorCode:    FeatureAlreadyExists,
		ErrorMessage: "feature already exists",
		HttpCode:     http.StatusConflict,
	}
	ErrCreateFeatureFailed = &ApplicationError{
		ErrorCode:    CreateFeatureFailed,
		ErrorMessage: "failed to create feature",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrUpdateFeatureFailed = &ApplicationError{
		ErrorCode:    UpdateFeatureFailed,
		ErrorMessage: "failed to update feature",
		HttpCode:     http.StatusInternalServerError,
	}
)
