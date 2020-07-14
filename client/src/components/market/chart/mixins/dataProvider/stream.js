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
                this.polling = setInterval(() => this.getStreamData(), 1000)
            }
        }
    },
    computed: {
        eos() {
            return this.$store.state.blockchain.eos
        }
    },
    mounted() {
        // update after createOrder success
        this.$bus.$on('updateChartData', () => this.getStreamData())
    },
    methods: {
        getStreamData() {
            this.eos.getTableRows(schema[this.symbol])
                .then(({ rows }) => {
                    if (rows[0]) {
                        const price = parseFloat(parseFloat(rows[0].price).toFixed(8))
                        this.streamData = this.updateCandle(price)
                        console.log('[stream]', this.streamData, price)
                    }
                })
        },
        updateCandle(price) {
            let lastCandle = this.data.slice(-1)[0]
            lastCandle.close = price

            return lastCandle
        },
        clearPolling() {
            if (this.polling) {
                clearInterval(this.polling)
                this.polling = null

                console.log('[stream] cleared')
            }
        }
    },
    beforeDestroy() {
        if (this.polling) clearInterval(this.polling)
    },
}