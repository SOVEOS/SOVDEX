<template>
    <div class="content-padding width100">
        <div class="form-group mb05">
            <input type="number" min="40" :max="balance[pair.base]" step="1" class="form-input" v-model="amount">
            <label><span class="text-uppercase">{{pair.base}}</span> amount</label>
        </div>
        <div class="text-sm text-secondary mb05">{{priceEquivalent}} {{pair.quote}}</div>
        <div class="columns mb05">
            <div class="column col-12 col-sm-6">
                <button :disabled="$v.amount.$invalid" class="btn btn-primary btn-block btn-success" @click="buy">
                    Buy <span class="text-uppercase">{{pair.base}}</span>
                </button>
                <div class="text-sm text-secondary"><b>{{balance[pair.quote] || 0}}</b> {{pair.quote}}</div>

            </div>
            <div class="column col-12 col-sm-6">
                <button :disabled="$v.amount.$invalid" class="btn btn-primary btn-block btn-error" @click="sell">
                    Sell <span class="text-uppercase">{{pair.base}}</span>
                </button>
                <div class="text-sm text-secondary"><b>{{balance[pair.base] || 0}}</b> {{pair.base}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required, between } from "vuelidate/lib/validators"

    export default {
        data: () => ({
            amount: 40,
            schema: {
                soveos: {
                    base: 'sov',
                    quote: 'eos'
                },
                svxeos: {
                    base: 'svx',
                    quote: 'eos'
                },
                sovusdt: {
                    base: 'sov',
                    quote: 'usdt'
                },
                eospbtc: {
                    base: 'eos',
                    quote: 'pbtc'
                },
                powpbtc: {
                    base: 'pow',
                    quote: 'pbtc'
                }
            },
            accountSchema: {
                soveos: {
                    buy: 'eosio.token',
                    sell: 'sovmintofeos',
                },
                svxeos: {
                    buy: 'eosio.token',
                    sell: 'svxmintofeos',
                },
                sovusdt: {
                    buy: 'tethertether',
                    sell: 'sovmintofeos',
                },
                eospbtc: {
                    buy: 'btc.ptokens',
                    sell: 'eosio.token',
                },
                powpbtc: {
                    buy: 'btc.ptokens',
                    sell: 'eosiopowcoin',
                },
            },
            balance: {
                eos: 0,
                sov: 0,
                svx: 0,
                pbtc: 0,
                usdt: 0
            },

            price: {
                eos: 0,
                usdt: 0,
                pbtc: 0
            },


            polling: null,
        }),
        computed: {
            ...mapState({
                eos: state => state.blockchain.eos,
                scatter: state => state.blockchain.scatter,
            }),
            pair() {
                const symbol = this.$route.params.symbol
                return this.schema[symbol]
            },
            priceEquivalent() {
                return parseFloat((this.price[this.pair.quote] * this.amount).toFixed(6))
            }
        },
        mounted() {
            if (this.scatter) {
                this.getBalance()
                this.getRate()
            }

            this.polling = setInterval(() => {
                this.getBalance()
                this.getRate()
            }, 1000)
        },
        methods: {
            buy() {
                // EX: sov/eos => memo: SOV, quantity: EOS
                const quantity = this.$options.filters.eosAmountFormat(this.priceEquivalent, this.pair.quote)
                this.submit(this.pair.base, quantity, 'buy')
            },
            sell() {
                // EX: sov/eos => memo: EOS, quantity: SOV
                const quantity = this.$options.filters.eosAmountFormat(this.amount, this.pair.base)
                this.submit(this.pair.quote, quantity, 'sell')
            },
            submit(currency, quantity, side) {

                const account = this.accountSchema[this.$route.params.symbol][side]

                if (confirm(`You really want to ${side} ${this.amount} ${this.pair.base.toUpperCase()}?`)) {
                    this.eos.transaction({
                        actions: [{
                            account,
                            name: 'transfer',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "from": this.scatter.name,
                                "to": 'sovdexrelays',
                                quantity,
                                "memo": currency.toUpperCase(),
                            }
                        }]
                    })
                        .then(() => this.$notice.success(`You <b>${side} ${this.amount}</b>`))
                        .catch(error => {
                            console.error(error)
                            //  this.$notice.error(res.error.details[0].message)
                        })
                }
            },
            async getBalance() {
                const eos = await this.eos.getAccount(this.scatter.name)
                    .then((res) => parseFloat(res.core_liquid_balance))

                const sov = await this.eos.getTableRows(this.params('sovmintofeos'))
                    .then((res) => this.updBalance(res))

                const svx = await this.eos.getTableRows(this.params('svxmintofeos'))
                    .then((res) => this.updBalance(res))

                const pbtc = await this.eos.getTableRows(this.params('btc.ptokens'))
                    .then((res) => this.updBalance(res))

                const usdt = await this.eos.getTableRows(this.params('tethertether'))
                    .then((res) => this.updBalance(res))


                this.balance = { eos, sov, svx, pbtc, usdt }
            },
            getRate() {

                // EOS
                this.eos.getTableRows({ "code": "sovdexrelays", "scope": "EOS", "table": "pair", "json": true })
                    .then((res) => {
                        this.price.eos = parseFloat(res.rows[0].price)
                    })

                // USDT
                this.eos.getTableRows({ "code": "sovdexrelays", "scope": "USDT", "table": "pair", "json": true })
                    .then((res) => {
                        this.price.usdt = parseFloat(res.rows[0].price)
                    })

                // PBTC
                this.eos.getTableRows({ "code": "sovdexrelays", "scope": "PBTC", "table": "eospair", "json": true })
                    .then((res) => {
                        this.price.pbtc = parseFloat(res.rows[0].price)
                    })
            },
            params(code) {
                return { "json": "true", code, "scope": this.scatter.name, "table": "accounts" }
            },
            updBalance({ rows }) {
                return (rows && rows[0]) ? parseFloat(rows[0].balance) : 0
            }
        },
        validations() {
            return {
                amount: {
                    required,
                    between: between(40, this.balance[this.pair.base]),
                },
            }
        },
        beforeDestroy() {
            if (this.polling) clearInterval(this.polling)
        },
    }
</script>

<style lang="scss" scoped>
    button {
        display: inline-block !important;
        line-height: 17px;

        span {
            padding-left: 0.2rem;
        }
    }

    .columns {
        margin: -0.25rem;

        .column {
            padding: 0.25rem
        }
    }
</style>