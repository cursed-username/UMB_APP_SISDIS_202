package kafka

import (
	"context"
	"encoding/json"
	"github.com/segmentio/kafka-go"
	"github.com/segmentio/kafka-go/snappy"
	"ihojose.com/sisdis/includes"
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
type publisher struct {
	writer *kafka.Writer
}

func NewPublisher(brokers []string, topic string) includes.Publisher {
	dialer := &kafka.Dialer{
		Timeout:  10 * time.Second,
		ClientID: clientID,
	}

	// In Next Version we will fix deprecated method
	c := kafka.WriterConfig{
		Brokers:          brokers,
		Topic:            topic,
		Balancer:         &kafka.LeastBytes{},
		Dialer:           dialer,
		WriteTimeout:     10 * time.Second,
		ReadTimeout:      10 * time.Second,
		CompressionCodec: snappy.NewCompressionCodec(),
	}

	return &publisher{kafka.NewWriter(c)}
}

func (p *publisher) Publish(ctx context.Context, payload interface{}) error {
	message, err := p.encodeMessage(payload)
	if err != nil {
		return err
	}

	return p.writer.WriteMessages(ctx, message)
}

func (p *publisher) encodeMessage(payload interface{}) (kafka.Message, error) {
	m, err := json.Marshal(payload)
	if err != nil {
		return kafka.Message{}, err
	}

	key := includes.Ulid()
	return kafka.Message{
		Key:   []byte(key),
		Value: m,
	}, nil
}
