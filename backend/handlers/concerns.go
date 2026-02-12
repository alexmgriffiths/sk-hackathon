package handlers

import (
	"net/http"

	"hackathon/services"

	"github.com/gin-gonic/gin"
)

type ConcernsHandler struct {
	service *services.ConcernsService
}

func NewConcernsHandler(service *services.ConcernsService) *ConcernsHandler {
	return &ConcernsHandler{service: service}
}

type AnalyzeRequest struct {
	Concern string `json:"concern" binding:"required"`
}

func (h *ConcernsHandler) Analyze(c *gin.Context) {
	var req AnalyzeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "concern field is required"})
		return
	}

	result, err := h.service.Analyze(c.Request.Context(), req.Concern)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to analyze concern"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"analysis": result})
}
