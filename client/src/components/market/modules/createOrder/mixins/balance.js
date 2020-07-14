export default {
    data: () => ({
        balance: {
            eos: 0,
            sov: 0,
            svx: 0,
            pbtc: 0,
            usdt: 0
        },
    }),
    methods: {
        getBalance() {
            const eosPromise = this.eos.getAccount(this.scatter.name)
                .then((res) => parseFloat(res.core_liquid_balance))

            const sovPromise = this.eos.getTableRows(this.params('sovmintofeos'))
                .then((res) => this.updBalance(res))

            const svxPromise = this.eos.getTableRows(this.params('svxmintofeos'))
                .then((res) => {
                    const balance = parseFloat(res.rows[0].balance)
                    const storeBalance = parseFloat(res.rows[0].storebalance)
                    const liquidBalance = (balance && storeBalance) ? balance - storeBalance : 0
                    return parseFloat((liquidBalance.toFixed(4)))
                })

            const pbtcPromise = this.eos.getTableRows(this.params('btc.ptokens'))
                .then((res) => parseFloat(this.updBalance(res).toFixed(8)))

            const usdtPromise = this.eos.getTableRows(this.params('tethertether'))
                .then((res) => this.updBalance(res))

            const powPromise = this.eos.getTableRows(this.params('eosiopowcoin'))
                .then((res) => this.updBalance(res))


            Promise.all([eosPromise, sovPromise, svxPromise, pbtcPromise, usdtPromise, powPromise])
                .then(res => {
                    this.balance = {
                        eos: res[0],
                        sov: res[1],
                        svx: res[2],
                        pbtc: res[3],
                        usdt: res[4],
                        pow: res[5],
                    }
                })
        },
        params(code) {
            return { "json": "true", code, "scope": this.scatter.name, "table": "accounts" }
        },
        updBalance({ rows }) {
            return (rows && rows[0]) ? parseFloat(rows[0].balance) : 0
        }
    }
}