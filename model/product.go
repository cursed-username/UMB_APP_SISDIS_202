package model

/**
 * sisdis was developed by Jose Buelvas (ihojose)
 *
 * @author        @ihojose
 * @author_url    dev.ihojose.com
 * @licence       Apache Licence v2.0
 * @year          2020
 * @donations     buymeacoff.ee/ihojose
 */

type Product struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Price string `json:"price"`
}
