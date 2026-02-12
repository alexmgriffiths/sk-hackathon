package router

import (
	"hackathon/handlers"
	"hackathon/lib/ai"
	"hackathon/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func New(pool *pgxpool.Pool) *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	aiClient := ai.NewClient()

	healthService := services.NewHealthService()
	healthHandler := handlers.NewHealthHandler(healthService)

	concernsService := services.NewConcernsService(aiClient)
	concernsHandler := handlers.NewConcernsHandler(concernsService)

	r.GET("/health", healthHandler.Check)
	r.POST("/analyze", concernsHandler.Analyze)

	return r
}
