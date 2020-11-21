package main

import (
	"github.com/gin-gonic/gin"
	"ihojose.com/sisdis/includes/kafka"
	"log"
	"os"
	"strings"
)

/**
 * sisdis was developed by Jose Buelvas (ihojose)
 *
 * @author        @ihojose
 * @author_url    dev.ihojose.com
 * @licence       Apache Licence v2.0
 * @year          2020
 * @donations     buymeacoff.ee/ihojose
 */
func main() {

	// Get environments
	var (
		brokers = os.Getenv("KAFKA_BROKERS")
		topic   = os.Getenv("KAFKA_TOPIC")
	)

	publisher := kafka.NewPublisher(strings.Split(brokers, ","), topic)

	// Start App
	app := gin.Default()

	// Api Endpoints
	app.POST("/recommendations", publishHandler(publisher))
	app.GET("/recommendations", gettingHangler(publisher))

	// Run App
	if err := app.Run(":8080"); err != nil {
		log.Panicln("Unexpected error in Recommendations API:", err)
	}
}
