import timestring from 'timestring'
import moment from 'moment'

import { getData } from './helper'

export default class Candles {
    constructor(data) {
        this.minutes = timestring(data.interval) / 60 // get count of minutes
        return this.init(data)
    }

    async init({ symbol, interval, limit }) {

        const data = await getData(symbol)
        const sessions = this.sessions(interval, limit)
        const candles = this.candles(data, sessions)

        return candles || []
    }


    sessions(interval, limit) {
        const session = timestring(interval) * 1000 // length of session
        const date = moment().utc().startOf('date').valueOf() // near 00.00 UTC
        const from = date - (session * limit)

        let sessions = []
        let time = from

        while (time <= Date.now()) {
            const s = { openTime: time, closeTime: time + session }
            time = s.closeTime
            sessions.push(s)
        }

        return sessions.slice(-limit)

    }

    candles(data, sessions) {
        const range = sessions.map(i => ({ ...i, range: this.range(data, i) })).filter(i => i.range.length > 0)

        const candles = range.reduce((result, item) => {
            const candle = this.сandle(item.range.map(i => i.price))
            result = result.concat([{ openTime: item.openTime, closeTime: item.closeTime, ...candle }])
            return result
        }, [])

        return candles
    }

    range(data, { openTime, closeTime }) {
        const from = data.findIndex(i => openTime <= i.time && closeTime >= i.time)
        return (from >= 0) ? data.slice(from, this.minutes) : []
    }

    сandle(val) {
        return {
            open: val[0],
            close: val.slice(-1)[0],
            high: Math.max.apply(Math, val),
            low: Math.min.apply(Math, val),
        }
    }
}