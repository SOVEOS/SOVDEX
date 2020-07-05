import Candles from './db/candles'

// http://localhost:3000/?symbol=sovdex&interval=5m&limit=100
export default async (app, options) => {
	app.all('/', (req, res) => {
		const params = req.query || {}

		if (params.symbol && params.interval) {
			return new Candles(params)
		}

		res.code(200).send('Endpoint ready')
	})
}