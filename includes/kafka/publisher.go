package kafka

import (
	"context"
	"github.com/segmentio/kafka-go"
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

// Publisher an instance that publish messages
type Publisher interface {

	// Publish publish a message into a stream
	Publish(ctx context.Context, payload interface{}) error
}

func NewPublisher(broker []string, topic string) Publisher {
	_ = &kafka.Dialer{
		Timeout: 10 * time.Second,
	}

	return nil
}
