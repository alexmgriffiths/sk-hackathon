package handlers

import (
	"net/http"

	"hackathon/services"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct {
	service *services.HealthService
}

func NewHealthHandler(service *services.HealthService) *HealthHandler {
	return &HealthHandler{service: service}
}

func (h *HealthHandler) Check(c *gin.Context) {
	c.JSON(http.StatusOK, h.service.Check())
}
