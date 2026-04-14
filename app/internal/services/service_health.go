package services

type ServiceHealth struct {
	Access *ServiceAccess
}

type ServiceHealthMethods interface {
	ServiceHealth() string
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
