package kafka

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/segmentio/kafka-go"
	"ihojose.com/sisdis/includes"
	"ihojose.com/sisdis/model"
	"time"
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

type consumer struct {
	reader *kafka.Reader
}

func NewConsumer(brokers []string, topic string) includes.Consumer {

	c := kafka.ReaderConfig{
		Brokers:         brokers,
		Topic:           topic,
		MinBytes:        10e3,            // 10KB
		MaxBytes:        10e6,            // 10MB
		MaxWait:         1 * time.Second, // Maximum amount of time to wait for new data to come when fetching batches of messages from kafka.
		ReadLagInterval: -1,
		GroupID:         includes.Ulid(),
		StartOffset:     kafka.LastOffset,
	}

	return &consumer{kafka.NewReader(c)}
}

func (c *consumer) Read(ctx context.Context, chMsg chan model.Product, chErr chan error) {
	defer c.reader.Close()

	for {

		m, err := c.reader.ReadMessage(ctx)
		if err != nil {
			chErr <- errors.New(fmt.Sprintf("error while reading a message: %v", err))
			continue
		}

		var message model.Product
		err = json.Unmarshal(m.Value, &message)
		if err != nil {
			chErr <- err
		}

		chMsg <- message
	}
}
