package router

import (
	"hackathon/handlers"
	"hackathon/lib/ai"
	"hackathon/services"

	"github.com/gin-gonic/gin"
)

func New() *gin.Engine {
	r := gin.Default()

	aiClient := ai.NewClient()

	healthService := services.NewHealthService()
	healthHandler := handlers.NewHealthHandler(healthService)

	concernsService := services.NewConcernsService(aiClient)
	concernsHandler := handlers.NewConcernsHandler(concernsService)

	r.GET("/health", healthHandler.Check)
	r.POST("/analyze", concernsHandler.Analyze)

	return r
}
