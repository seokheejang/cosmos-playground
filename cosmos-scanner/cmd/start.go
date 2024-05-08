package cmd

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/seokheejang/cosmos-scanner/internal/client"
)

var db = make(map[string]string)

func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})
	return r
}

func Execute() {
	r := setupRouter()
	
	client.GRPClient()
	
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
