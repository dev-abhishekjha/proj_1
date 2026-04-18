package telemetry

import (
	"app/Saranam/pkg/log"
	"context"

	"google.golang.org/grpc"
)

// TelemetryUtils holds configuration for telemetry initialisation.
type TelemetryUtils struct {
	Logger      log.Logger
	ServiceName string
	AppEnv      string
	AppVersion  string
	ExporterURL string
	Ctx         context.Context
}

// NewTelemetryUtils initialises telemetry (currently a no-op placeholder).
// Replace this with real OpenTelemetry wiring when needed.
func NewTelemetryUtils(t *TelemetryUtils) *TelemetryUtils {
	if t.Logger != nil {
		t.Logger.Infof("telemetry initialised (no-op) for service: %s", t.ServiceName)
	}
	return t
}

// NewGrpcServer returns a plain gRPC server. Wraps grpc.NewServer so that
// telemetry interceptors can be injected here later without changing call sites.
func NewGrpcServer(opts ...grpc.ServerOption) *grpc.Server {
	return grpc.NewServer(opts...)
}
