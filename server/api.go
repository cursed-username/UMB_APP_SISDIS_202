package main

import (
	"context"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"ihojose.com/sisdis/includes"
	"ihojose.com/sisdis/model"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
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

func gettingHangler(publisher includes.Publisher) func(*gin.Context) {
	return func(c *gin.Context) {
		jsonFile, err := os.Open("data/recommended.products.json")
		category := c.Query("category")
		limit, _ := strconv.ParseInt(c.Query("limit"), 10, 64)
		var count int64 = 0
		var response = make([]model.Product, 0)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo datos."})
			log.Panicln("ERROR", err)
			return
		}

		defer jsonFile.Close()

		byteValue, _ := ioutil.ReadAll(jsonFile)
		var products []model.Product

		_ = json.Unmarshal(byteValue, &products)

		if category != "" {
			for _, p := range products {
				if p.Category == category {
					if count > limit {
						break
					}
					response = append(response, p)
					count++
				}
			}
		} else {
			for _, p := range products {
				if count > limit {
					break
				}
				response = append(response, p)
				count++
			}
		}

		c.JSON(http.StatusAccepted, response)
	}
}

func publishHandler(publisher includes.Publisher) func(*gin.Context) {
	return func(c *gin.Context) {
		var req model.Product
		err := json.NewDecoder(c.Request.Body).Decode(&req)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "You are doing wrong request for the recommendations."})
			log.Panicln("ERROR:", err)
			return
		}

		message := includes.NewMessage(req)

		if err := publisher.Publish(context.Background(), message); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Unexpected error while publishing request in broker."})
			log.Panicln("ERROR:", err)
			return
		}

		c.JSON(http.StatusAccepted, gin.H{"message": "Productos solicitados."})
	}
}
