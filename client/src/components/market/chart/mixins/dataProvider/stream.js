import axios from 'axios'

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

export default {
    data: () => ({
        streamData: {},
        polling: null,
    }),
    watch: {
        data(val) {
            if (val && val.length > 0) {
                this.clearPolling()
                this.polling = setInterval(() => this.getStreamData(), 1000 * 5) // 5s upd
            }
        }
    },
    methods: {
        getStreamData(symbol) {
            const data = schema[symbol]
            return axios({ method: 'post', url: 'http://api.cypherglass.com/v1/chain/get_table_rows', data })
                .then(({ data }) => {
                    if (data.rows[0]) {
                        const price = parseFloat(parseFloat(data.rows[0].price).toFixed(8))
                        this.streamData = this.updateKline(price)
                    }
                })
        },
        updateKline(price) {
            let lastCandle = this.data.slice(-1)[0]
            lastCandle.close = price

            return lastCandle
        },
        clearPolling() {
            if (this.polling) {
                clearInterval(this.polling)
                this.polling = null
            }
        }
    },
    beforeDestroy() {
        if (this.polling) clearInterval(this.polling)
    },
}