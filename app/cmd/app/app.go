package app

import (
	"app/Saranam/cmd/app/middlewares"
	"app/Saranam/internal/config"
	"app/Saranam/internal/controllers"
	"app/Saranam/internal/repositories"
	"app/Saranam/internal/services"
	"app/Saranam/pkg/db"
	"app/Saranam/pkg/global"
	"app/Saranam/pkg/log"
	"app/Saranam/pkg/telemetry"
	"context"
	"fmt"
	"net/http"
	"time"

	"google.golang.org/grpc"

	"github.com/gin-gonic/gin"
)

type App struct {
	db          *db.Store
	repos       *repositories.Repositories
	controllers *controllers.Controllers
	middlewares *middlewares.Middlewares
	services    *services.Services
	router      *gin.Engine
	http        *http.Server
	grpc        *grpc.Server
}

func (app *App) newDatabaseConnection(cfg *config.Config, logger log.Logger) {
	var err error
	app.db, err = db.NewStore(logger, cfg.Database.MasterDatabaseDsn, cfg.Database.SlaveDatabaseDsn, cfg.AppName)
	if err != nil {
		panic(fmt.Errorf("db initialization failed: %w", err))
	}
}

func (app *App) setUpHandlers(cfg *config.Config, logger log.Logger) *gin.Engine {
	var router *gin.Engine
	if cfg.Environment == string(global.StageEnv) || cfg.Environment == string(global.ProdEnv) {
		logger.Infof("setting gin to release mode")
		gin.SetMode(gin.ReleaseMode)
	}
	router = gin.Default()
	router.Use(app.middlewares.Cors.Handler())
	app.addRoutes(router, app.middlewares)
	return router
}

func (app *App) newApp(cfg *config.Config, l log.Logger) {
	ctx := context.Background()
	logger := l.With(ctx)

	app.newDatabaseConnection(cfg, logger)
	telemetry.NewTelemetryUtils(&telemetry.TelemetryUtils{
		Logger:      logger,
		ServiceName: cfg.AppName,
		AppEnv:      cfg.Environment,
		AppVersion:  cfg.AppVersion,
		ExporterURL: cfg.OtlpExporterUrl,
		Ctx:         ctx,
	})

	app.repos = repositories.NewRepositories(app.db, logger)
	app.services = services.NewServices(cfg, app.db, app.repos, logger)
	app.controllers = controllers.NewControllers(cfg, logger, app.services)
	app.middlewares = middlewares.NewMiddlewares(cfg, app.repos)
	app.router = app.setUpHandlers(cfg, logger)
	app.http = &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.ServerPort),
		Handler:      app.router,
		ReadTimeout:  time.Second * 60,
		WriteTimeout: time.Second * 60,
		IdleTimeout:  time.Second * 60,
	}
	app.grpc = app.setupGrpcServer(cfg.GrpcPort, logger, app.controllers)
}

func (app *App) start(cfg *config.Config, logger log.Logger) {
	defer func() {
		logger.Infof("app shutting down: cleaning up")
	}()

	logger.Infof("app initialized: HTTP running on port %d, gRPC running on port %d", cfg.ServerPort, cfg.GrpcPort)

	// Start gRPC server in a goroutine
	go app.startGrpcServer(cfg.GrpcPort, logger)

	// Start HTTP server (blocking)
	if err := app.http.ListenAndServe(); err != nil {
		logger.Errorf("HTTP server failed to start: %v", err)
	}
}

func (app *App) NewApplication(cfg *config.Config, logger log.Logger) {
	app.newApp(cfg, logger)
	app.start(cfg, logger)

	defer app.destroy(logger)
}

func (app *App) destroy(logger log.Logger) {
	logger.Infof("shutting down app")
}
