package includes

import (
	"context"
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

type Publisher interface {
	// Publish publish a message into a stream
	Publish(ctx context.Context, payload interface{}) error
}
