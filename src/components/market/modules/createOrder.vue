<template>
    <div class="content-padding">
        <div class="form-group mb05">
            <input type="number" min="30" :max="balance[pair.base]" step="1" class="form-input" v-model="amount">
            <label><span class="text-uppercase">{{pair.base}}</span> amount</label>
        </div>
        <div class="text-sm text-secondary mb05">{{eosCount}} EOS</div>
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
                eospbtc: {
                    base: 'eos',
                    quote: 'pbtc'
                },
                sovusdt: {
                    base: 'sov',
                    quote: 'usdt'
                },
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
            },
            balance: {
                eos: 0,
                sov: 0,
                svx: 0,
                pbtc: 0,
                usdt: 0
            },
            eosPrice: 0,

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
            eosCount() {
                return parseFloat((this.eosPrice * this.amount).toFixed(6))
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
                const quantity = this.$options.filters.eosAmountFormat(this.eosCount, this.pair.quote)
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
                    .then((res) => parseFloat(res.core_liquid_balance.replace('EOS', '')))

                const sov = await this.eos.getTableRows(this.params('sovmintofeos'))
                    .then((res) => parseFloat(res.rows[0].balance.replace('SOV', '')))

                const svx = await this.eos.getTableRows(this.params('svxmintofeos'))
                    .then((res) => parseFloat(res.rows[0].balance.replace('SVX', '')))

                const pbtc = await this.eos.getTableRows(this.params('btc.ptokens'))
                    .then((res) => parseFloat(res.rows[0].balance.replace('PBTC', '')))

                /* ERROR  TypeError: Cannot read property 'balance' of undefined
                const usdt = await this.eos.getTableRows(this.params('tethertether'))
                    .then((res) => parseFloat(res.rows[0].balance.replace('USDT', '')))
                 */

                this.balance = { eos, sov, svx, pbtc }
            },
            getRate() {
                this.eos.getTableRows({
                    "json": "true",
                    "code": "sovdexrelays",
                    "scope": "EOS",
                    "table": "pair"
                }).then((res) => {
                    this.eosPrice = parseFloat(parseFloat(res.rows[0].price).toFixed(8))
                })
            },
            params(code) {
                return { "json": "true", code, "scope": this.scatter.name, "table": "accounts" }
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