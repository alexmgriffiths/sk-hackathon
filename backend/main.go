package main

import (
	"context"
	"log"
	"os"

	"hackathon/lib/db"
	"hackathon/router"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx := context.Background()
	pool, err := db.Connect(ctx)
	if err != nil {
		log.Printf("Warning: Database not available: %v", err)
	}
	if pool != nil {
		defer pool.Close()
	}

	r := router.New(pool)

	log.Printf("Server starting on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
