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
	SomethingWentWrong ErrorCode = "SWW01"
	InvalidParams      ErrorCode = "INV01"
	InvalidRequest     ErrorCode = "IR01"
	EmptyBody          ErrorCode = "EB01"
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
)
