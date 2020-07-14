<template>
    <div class="content-padding width100">
        <div class="columns mb05">
            <div class="column col-12 col-sm-6">
                <div class="form-group form-action mb05">
                    <input type="number" min="0" :max="balance[pair.quote]" :step="step(pair.quote)" class="form-input"
                        v-model="buyAmount">
                    <span class="action text-uppercase text-secondary">{{pair.quote}}</span>
                </div>

                <button class="btn btn-primary btn-block btn-success btn-lg" @click="buy">
                    Buy <span class="text-uppercase">{{pair.base}}</span>
                    <div class="text-normal">{{cutBancor(bancorPrice.buy, pair.base)}} {{pair.base}}</div>
                </button>
                <div class="text-sm text-secondary"><b>{{balance[pair.quote] || 0}}</b> {{pair.quote}}</div>
            </div>
            <div class="column col-12 col-sm-6">
                <div class="form-group form-action mb05">
                    <input type="number" min="0" :max="balance[pair.base]" :step="step(pair.base)" class="form-input"
                        v-model="sellAmount">
                    <span class="action text-uppercase text-secondary">{{pair.base}}</span>
                </div>
                <button class="btn btn-primary btn-block btn-error btn-lg" @click="sell">
                    Sell <span class="text-uppercase">{{pair.base}}</span>
                    <div class="text-normal">{{cutBancor(bancorPrice.sell, pair.quote)}} {{pair.quote}}</div>
                </button>
                <div class="text-sm text-secondary"><b>{{balance[pair.base] || 0}}</b> {{pair.base}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    // mixins
    import balance from './mixins/balance'
    import prices from './mixins/prices'

    export default {
        mixins: [balance, prices],
        data: () => ({
            buyAmount: 0,
            sellAmount: 0,
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

            polling: null,
        }),
        watch: {
            scatter(val) {
                if (val) {
                    this.getBalance()
                    this.getRate()
                }
            }
        },
        computed: {
            ...mapState({
                eos: state => state.blockchain.eos,
                scatter: state => state.blockchain.scatter,
            }),
            pair() {
                const symbol = this.$route.params.symbol
                return this.schema[symbol]
            },
        },
        mounted() {
            this.polling = setInterval(() => {
                this.getBalance()
                this.getRate()
            }, 1000)
        },
        methods: {
            buy() {
                // EX: sov/eos => memo: SOV, quantity: EOS
                const quantity = this.$options.filters.eosAmountFormat(this.buyAmount, this.pair.quote)
                this.submit(this.pair.base, quantity, 'buy')
            },
            sell() {
                // EX: sov/eos => memo: EOS, quantity: SOV
                const quantity = this.$options.filters.eosAmountFormat(this.sellAmount, this.pair.base)
                this.submit(this.pair.quote, quantity, 'sell')
            },
            submit(currency, quantity, side) {

                const account = this.accountSchema[this.$route.params.symbol][side]
                const amount = (side == 'buy') ? this.buyAmount : this.sellAmount


                if (confirm(`You really want to ${side} ${amount} ${this.pair.base.toUpperCase()}?`)) {
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
                        .then(() => {
                            this.$notice.success(`You <b>${side} ${amount} ${this.pair.base}</b>`)
                            this.getBalance()

                            this.$bus.$emit('updateChartData')
                        })
                        .catch(error => {
                            console.error(error)
                            this.$notice.error('Order error')
                        })
                }
            },
            step(pair) {
                if (pair == 'pbtc') return 0.0001
                if (pair == 'eos' || pair == 'usdt') return 0.01
                if (pair == 'pow') return 0.1

                return 1
            },
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