import axios from 'axios'

import { tickModel, productionTickModel } from './models'

const schema = {
    soveos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "pair",
        "json": true
    },
    svxeos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "svxpair",
        "json": true
    },
    sovusdt: {
        "code": "sovdexrelays",
        "scope": "USDT",
        "table": "pair",
        "json": true
    },
    eospbtc: {
        "code": "sovdexrelays",
        "scope": "PBTC",
        "table": "eospair",
        "json": true
    },
    powpbtc: {
        "code": "sovdexrelays",
        "scope": "PBTC",
        "table": "powpair",
        "json": true
    }
}

const limit = 200000

const request = (data) => axios({ method: 'post', url: 'http://api.cypherglass.com/v1/chain/get_table_rows', data })

export const pairs = Object.keys(schema)

// Queries

export const ticks = (symbol) => {
    return tickModel.find({ symbol }).sort('time').limit(limit).exec()
}

// Mutations

export const saveTick = async (symbol) => {
    const price = await request(schema[symbol])
        .then(({ data }) => data.rows[0] ? parseFloat(parseFloat(data.rows[0].price).toFixed(8)) : false)

    if (price) {
        return new tickModel({ symbol, price, time: Date.now() }).save()
    }

}

export const deleteTicks = () => {
    const timeLine = Date.now() - (1000 * 60 * limit)
    return tickModel.deleteMany({ time: { $lte: timeLine } })
}