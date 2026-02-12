package services

type HealthService struct{}

func NewHealthService() *HealthService {
	return &HealthService{}
}

func (s *HealthService) Check() map[string]string {
	return map[string]string{"status": "ok"}
}
