import Router from '@koa/router'
const router = new Router()

import Candles from './modules/candles'

// http://localhost:3000/?symbol=soveos&interval=5m&limit=100
router.get('/', async (ctx, next) => {
	let params = ctx.query || {}
	params.limit = (params.limit && params.limit <= 300) ? params.limit : 300
	
	if (params.symbol && params.interval) {
		ctx.body = await new Candles(params)
		return false
	}

	ctx.body = 'Endpoint ready'
})


export default router