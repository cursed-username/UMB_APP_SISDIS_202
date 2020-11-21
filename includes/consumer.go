package includes

import (
	"context"
	"ihojose.com/sisdis/model"
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

type Consumer interface {
	// Read read into the stream
	Read(ctx context.Context, chMsg chan model.Product, chErr chan error)
}
