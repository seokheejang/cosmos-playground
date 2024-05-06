package cmd

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
	// Listen and Server in 0.0.0.0:8080
	
	var rpcUris []string
	rpcUris = [""]
	client := client.TMClient(rpcUris)

	r.Run(":8080")
}
