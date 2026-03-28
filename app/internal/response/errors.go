package response

import "net/http"

type ErrorCode string
type SuccessCode string

type ApplicationError struct {
	ErrorCode    ErrorCode
	ErrorMessage string
	HttpCode     int
}

func (e *ApplicationError) Error() string {
	return e.ErrorMessage
}

const ApiSuccessResponse SuccessCode = "00000"
const ApiSuccessMessage string = "success"

const (
	SomethingWentWrong       ErrorCode = "SWW01"
	InvalidParams            ErrorCode = "INV01"
	FetchingKpis             ErrorCode = "FK01"
	FetchingKpiRelationships ErrorCode = "FKR01"

	InvalidRequest ErrorCode = "IR01"
	EmptyBody      ErrorCode = "EB01"

	FetchingDictionary  ErrorCode = "EFD01"
	FetchingServices    ErrorCode = "EFS01"
	FetchingDeployments ErrorCode = "EFD02"
	FetchingTeams       ErrorCode = "EFT01"
	FetchingTeamRoles   ErrorCode = "EFT02"

	CreatingTeam      ErrorCode = "ECT01"
	UpdatingTeam      ErrorCode = "EUT01"
	TeamNotFound      ErrorCode = "TNF01"
	TeamAlreadyExists ErrorCode = "TAE01"
)

var (
	ErrSomethingWentWrong = &ApplicationError{
		ErrorCode:    SomethingWentWrong,
		ErrorMessage: "something went wrong",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrInvalidParams = &ApplicationError{
		ErrorCode:    InvalidParams,
		ErrorMessage: "invalid params",
		HttpCode:     http.StatusBadRequest,
	}
	ErrInvalidRequest = &ApplicationError{
		ErrorCode:    InvalidRequest,
		ErrorMessage: "invalid request",
		HttpCode:     http.StatusBadRequest,
	}
	ErrEmptyBody = &ApplicationError{
		ErrorCode:    EmptyBody,
		ErrorMessage: "request body is empty",
		HttpCode:     http.StatusBadRequest,
	}
	ErrFetchingTeams = &ApplicationError{
		ErrorCode:    FetchingTeams,
		ErrorMessage: "failed to fetch teams",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrFetchingTeamRoles = &ApplicationError{
		ErrorCode:    FetchingTeamRoles,
		ErrorMessage: "failed to fetch team roles",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrFetchingKpis = &ApplicationError{
		ErrorCode:    FetchingKpis,
		ErrorMessage: "failed to fetch kpis",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrFetchingKpiRelationships = &ApplicationError{
		ErrorCode:    FetchingKpiRelationships,
		ErrorMessage: "failed to fetch kpi relationships",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrCreatingTeam = &ApplicationError{
		ErrorCode:    CreatingTeam,
		ErrorMessage: "failed to create team",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrUpdatingTeam = &ApplicationError{
		ErrorCode:    UpdatingTeam,
		ErrorMessage: "failed to update team",
		HttpCode:     http.StatusInternalServerError,
	}
	ErrTeamNotFound = &ApplicationError{
		ErrorCode:    TeamNotFound,
		ErrorMessage: "team not found",
		HttpCode:     http.StatusNotFound,
	}
	ErrTeamAlreadyExists = &ApplicationError{
		ErrorCode:    TeamAlreadyExists,
		ErrorMessage: "team already exists",
		HttpCode:     http.StatusConflict,
	}
)
