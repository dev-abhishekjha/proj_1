package services

import (
	"context"

	notification "bitbucket.org/fyscal/be-proto/go-proto/notification/rpc"
)

type ServiceHealth struct {
	Access *ServiceAccess
}

type ServiceHealthMethods interface {
	ServiceHealth() string
	SendNotification(ctx context.Context) string
}

func NewServiceHealth(access *ServiceAccess) ServiceHealthMethods {
	return &ServiceHealth{
		Access: access,
	}
}

func (s *ServiceHealth) ServiceHealth() string {
	healthRepo := s.Access.Repositories.Health
	return healthRepo.GetHealth()
}

func (s *ServiceHealth) SendNotification(ctx context.Context) string {
	logger := s.Access.Logger
	logger.Info("Sending notification via GRPC")
	notificationClient := s.Access.Clients.Notification
	_, err := notificationClient.GetClient().SendNotification(ctx, &notification.RequestSendNotification{
		Uid: "uid_1234",
	})
	if err != nil {
		logger.Error("Failed to send notification via GRPC", "error", err)
		return "Failed to send notification via GRPC"
	}
	return "Notification sent"
}
