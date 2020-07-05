import axios from 'axios'

import db from './index'

const schema = {
    soveos: {
        "code": "sovdexrelays", "scope": "EOS", "table": "pair", "json": true
    },
    svxeos: {
        "code": "sovdexrelays", "scope": "EOS", "table": "svxpair", "json": true
    },
    sovusdt: {
        "code": "sovdexrelays", "scope": "USDT", "table": "pair", "json": true
    },
    eospbtc: {
        "code": "sovdexrelays", "scope": "PBTC", "table": "eospair", "json": true
    },
    powpbtc: {
        "code": "sovdexrelays", "scope": "PBTC", "table": "powpair", "json": true
    }
}

export const pairs = Object.keys(schema)

// DB helpers

const setData = ({ symbol, price }) => {
    const time = Date.now()
    return db.insert({ symbol, price, time })
}

export const getData = (symbol) => {
    return db.find({ symbol }).sort('time').exec()
}

// Protocol helpers

export const setSymbolData = async (symbol) => {
    return request(schema[symbol]).then(({ data }) => {
        if (data.rows[0]) {
            const price = parseFloat(parseFloat(data.rows[0].price).toFixed(8))
            if (price) setData({ symbol, price })
        }
    })
}

const request = (data) => axios({ method: 'post', url: 'http://api.cypherglass.com/v1/chain/get_table_rows', data })