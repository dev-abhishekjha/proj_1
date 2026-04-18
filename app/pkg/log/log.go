package log

import (
	"context"
	"fmt"
	"os"
	"time"
)

// Logger is the application logging interface.
type Logger interface {
	Infof(format string, args ...interface{})
	Errorf(format string, args ...interface{})
	Debugf(format string, args ...interface{})
	Warnf(format string, args ...interface{})
	With(ctx context.Context) Logger
}

// level controls the minimum log level emitted.
type level string

const (
	levelDebug level = "DEBUG"
	levelInfo  level = "INFO"
	levelWarn  level = "WARN"
	levelError level = "ERROR"
)

// stdLogger is a simple structured logger that writes to stdout/stderr.
type stdLogger struct {
	ctx    context.Context
	fields map[string]interface{}
}

// NewLogger returns a new Logger backed by a simple structured writer.
func NewLogger() Logger {
	return &stdLogger{
		ctx:    context.Background(),
		fields: make(map[string]interface{}),
	}
}

func (l *stdLogger) log(lvl level, format string, args ...interface{}) {
	msg := fmt.Sprintf(format, args...)
	timestamp := time.Now().UTC().Format(time.RFC3339)

	out := os.Stdout
	if lvl == levelError {
		out = os.Stderr
	}

	fmt.Fprintf(out, "[%s] %s %s\n", timestamp, lvl, msg)
}

func (l *stdLogger) Infof(format string, args ...interface{}) {
	l.log(levelInfo, format, args...)
}

func (l *stdLogger) Errorf(format string, args ...interface{}) {
	l.log(levelError, format, args...)
}

func (l *stdLogger) Debugf(format string, args ...interface{}) {
	l.log(levelDebug, format, args...)
}

func (l *stdLogger) Warnf(format string, args ...interface{}) {
	l.log(levelWarn, format, args...)
}

func (l *stdLogger) With(ctx context.Context) Logger {
	return &stdLogger{
		ctx:    ctx,
		fields: l.fields,
	}
}
