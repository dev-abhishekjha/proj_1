package requests

type RequestCreateLog struct {
	Message string `json:"message"`
}

type UriFindLog struct {
	ID int64 `uri:"id" binding:"required"`
}

type UriFindLogs struct {
	Limit int `form:"limit,default=10"`
	Page  int `form:"page,default=0"`
}
