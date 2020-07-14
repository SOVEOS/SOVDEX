export default {
    data: () => ({
        price: {
            eos: 0,
            usdt: 0,
            pbtc: 0,
            pow: 0,
            svx: 0,
        },
        bancor: {}
    }),
    computed: {
        bancorPrice() {
            const symbol = this.$route.params.symbol
            const buyAmount = this.buyAmount
            const sellAmount = this.sellAmount

            if (symbol == 'svxeos') {
                return this.getBancor(this.bancor['svx'], buyAmount, sellAmount)
            } else if (symbol == 'powpbtc') {
                return this.getBancor(this.bancor['pow'], buyAmount, sellAmount)
            } else if (this.bancor[this.pair.quote]) {
                return this.getBancor(this.bancor[this.pair.quote], buyAmount, sellAmount)
            }

            return { buy: 0, sell: 0 }
        },
    },
    methods: {
        getRate() {
            const eosPromise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "EOS", "table": "pair", "json": true })
                .then((res) => this.updateResponse(res))

            const usdtPromise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "USDT", "table": "pair", "json": true })
                .then((res) => this.updateResponse(res))

            const pbtcPrimise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "PBTC", "table": "eospair", "json": true })
                .then((res) => this.updateResponse(res))

            const powPromise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "PBTC", "table": "powpair", "json": true })
                .then((res) => this.updateResponse(res))

            const svxPromise = this.eos.getTableRows({ "code": "sovdexrelays", "scope": "EOS", "table": "svxpair", "json": true })
                .then((res) => this.updateResponse(res))

            Promise.all([eosPromise, usdtPromise, pbtcPrimise, powPromise, svxPromise]).then(res => {
                this.price = { eos: res[0].price, usdt: res[1].price, pbtc: res[2].price, pow: res[3].price, svx: res[4].price }

                this.bancor = {
                    eos: res[0].bancor,
                    usdt: res[1].bancor,
                    pbtc: res[2].bancor,
                    pow: res[3].bancor,
                    svx: res[4].bancor,
                }
            })
        },
        updateResponse(res) {
            const bancor = res
            const price = parseFloat(res.rows[0].price)
            return { bancor, price }
        },
        getBancor({ rows }, buyAmount, sellAmount) {

            const cw = parseFloat(rows[0].cw)
            const balance = parseFloat(rows[0].connectorbal)
            const outstanding = parseFloat(rows[0].outstandingbal)

            buyAmount = parseFloat(buyAmount)
            sellAmount = parseFloat(sellAmount)

            const buy = (-outstanding * (Math.pow((1 - (buyAmount / (balance + buyAmount))), (cw / 100)) - 1)).toFixed(8)
            const sell = (-balance * (Math.pow(((1 - (sellAmount / (outstanding + sellAmount)))), (1 / (cw / 100))) - 1)).toFixed(8)

            return { buy: parseFloat(buy), sell: parseFloat(sell) }
        },
        cutBancor(quantity, currency) {
            if (currency == 'pow' || currency == 'pbtc') return quantity

            return quantity.toFixed(4)
        }
    }
}