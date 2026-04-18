package app

import (
	"app/Saranam/internal/controllers"
	"app/Saranam/pkg/log"
	"app/Saranam/pkg/telemetry"
	"context"
	"fmt"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

// setupGrpcServer creates and configures the gRPC server.
func (app *App) setupGrpcServer(grpcPort int, logger log.Logger, ctrls *controllers.Controllers) *grpc.Server {
	grpcServer := telemetry.NewGrpcServer(
		grpc.UnaryInterceptor(app.grpcUnaryInterceptor(logger)),
	)

	// Register service implementations here as they are added.
	// e.g.: pb.RegisterFooServiceServer(grpcServer, ctrls.Foo)

	// Enable reflection for tools like grpcurl.
	reflection.Register(grpcServer)

	logger.Infof("gRPC server configured on port %d", grpcPort)
	return grpcServer
}

// startGrpcServer starts the gRPC server on the given port.
func (app *App) startGrpcServer(grpcPort int, logger log.Logger) {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", grpcPort))
	if err != nil {
		logger.Errorf("failed to listen on gRPC port %d: %v", grpcPort, err)
		return
	}

	logger.Infof("gRPC server starting on port %d", grpcPort)
	if err := app.grpc.Serve(lis); err != nil {
		logger.Errorf("gRPC server failed to serve: %v", err)
	}
}

// grpcUnaryInterceptor provides logging and error handling for gRPC requests.
func (app *App) grpcUnaryInterceptor(logger log.Logger) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		logger.Infof("gRPC method called: %s", info.FullMethod)

		resp, err := handler(ctx, req)

		if err != nil {
			logger.Errorf("gRPC method %s failed: %v", info.FullMethod, err)
		}

		return resp, err
	}
}
