package app

import (
	"app/ontology/internal/controllers"
	"context"
	"fmt"

	"bitbucket.org/fyscal/be-commons/pkg/log"
	"bitbucket.org/fyscal/be-commons/pkg/telemetry"

	//"bitbucket.org/fyscal/be-proto/go-proto/boiler_plate/rpc"
	"net"

	helloService "bitbucket.org/fyscal/be-proto/go-proto/boiler_plate/rpc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

// setupGrpcServer creates and configures the gRPC server
func (app *App) setupGrpcServer(grpcPort int, logger log.Logger, controllers *controllers.Controllers) *grpc.Server {
	// Create gRPC server with options
	// Used telemetry.NewGrpcServer wrapper to get the gRPC server with telemetry enabled
	grpcServer := telemetry.NewGrpcServer(
		grpc.UnaryInterceptor(app.grpcUnaryInterceptor(logger)),
	)

	// Register services
	helloService.RegisterHelloServiceServer(grpcServer, controllers.Health)

	// Enable reflection for tools like grpcurl
	reflection.Register(grpcServer)

	logger.Infof("gRPC server configured on port %d", grpcPort)
	return grpcServer
}

// startGrpcServer starts the gRPC server
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

// grpcUnaryInterceptor provides logging and error handling for gRPC requests
func (app *App) grpcUnaryInterceptor(logger log.Logger) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		logger.Infof("gRPC method called: %s", info.FullMethod)

		// Call the handler
		resp, err := handler(ctx, req)

		if err != nil {
			logger.Errorf("gRPC method %s failed: %v", info.FullMethod, err)
		}

		return resp, err
	}
}
