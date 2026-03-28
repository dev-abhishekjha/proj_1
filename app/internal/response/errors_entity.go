package response

import "net/http"

const (
	FetchingEntitiesFailed          ErrorCode = "EFE01"
	FetchingEntityMetricsFailed     ErrorCode = "EFM01"
	FetchingEntityTransitionsFailed ErrorCode = "EFT01"
	CreateEntityFailed              ErrorCode = "ECE01"
	UpdateEntityFailed              ErrorCode = "EUE01"
	EntityNotFound                  ErrorCode = "ENF01"
	EntityAlreadyExists             ErrorCode = "EAE01"
	FeatureIdAlreadySet             ErrorCode = "EFI01"
	FetchingEntityApisFailed        ErrorCode = "EFA01"
)

var (
	ErrFetchingEntitiesFailed = &ApplicationError{
		ErrorCode:    FetchingEntitiesFailed,
		ErrorMessage: "failed to fetch entities",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrFetchingEntityMetricsFailed = &ApplicationError{
		ErrorCode:    FetchingEntityMetricsFailed,
		ErrorMessage: "failed to fetch entity metrics",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrFetchingEntityTransitionsFailed = &ApplicationError{
		ErrorCode:    FetchingEntityTransitionsFailed,
		ErrorMessage: "failed to fetch entity transitions",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrFetchingEntityApisFailed = &ApplicationError{
		ErrorCode:    FetchingEntityApisFailed,
		ErrorMessage: "failed to fetch entity apis",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrCreateEntityFailed = &ApplicationError{
		ErrorCode:    CreateEntityFailed,
		ErrorMessage: "failed to create entity",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrUpdateEntityFailed = &ApplicationError{
		ErrorCode:    UpdateEntityFailed,
		ErrorMessage: "failed to update entity",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrEntityNotFound = &ApplicationError{
		ErrorCode:    EntityNotFound,
		ErrorMessage: "entity not found",
		HttpCode:     http.StatusNotFound,
	}
	ErrEntityAlreadyExists = &ApplicationError{
		ErrorCode:    EntityAlreadyExists,
		ErrorMessage: "entity already exists",
		HttpCode:     http.StatusConflict,
	}
	ErrFeatureIdAlreadySet = &ApplicationError{
		ErrorCode:    FeatureIdAlreadySet,
		ErrorMessage: "feature_id can only be updated if it is currently null",
		HttpCode:     http.StatusBadRequest,
	}
)
