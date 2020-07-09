<template>
    <div class="container container-padding grid-xs">

        <balance />

        <div class="section">
            <div class="section-item section-item-filled">
                <div class="columns">
                    <div class="column col-6 col-sm-12">
                        <div class="form-group">
                            <input type="number" class="form-input" min="0" :max="balance" v-model="stakeCount"
                                placeholder="Enter SVX count" required>
                            <label>Max {{balance}}</label>
                        </div>
                        <button class="btn btn-primary btn-block" @click="stake" :disabled="$v.stakeCount.$invalid">
                            <span>Stake</span>
                            <span style="margin-left: 5px;" v-if="stakeCount > 0">{{stakeCount}} SVX</span>
                        </button>
                    </div>
                    <div class="column col-6 col-sm-12">
                        <div class="form-group">
                            <input type="number" class="form-input" min="0" :max="stakedBalance" v-model="unstakeCount"
                                required>
                            <label>Max {{stakedBalance}}</label>
                        </div>
                        <div class="text-sm text-secondary"></div>
                        <button class="btn btn-primary btn-block" @click="unstake" :disabled="$v.unstakeCount.$invalid">
                            <span>Unstake</span>
                            <span style="margin-left: 5px;" v-if="unstakeCount > 0">{{unstakeCount}} SVX</span>
                        </button>
                    </div>
                </div>

                <div class="text-sm text-secondary mt05">Staked {{stakedBalance}} SVX</div>
                <div class="text-sm text-secondary" v-if="discount >= 5">Discount {{discount}}%</div>

            </div>

            <div class="text-sm text-secondary container">Stake 777k+ SVX for automatic node payouts</div>

        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required, between } from "vuelidate/lib/validators"

    import discount from './discount'

    export default {
        mixins: [discount],
        data: () => ({
            stakeCount: 0,
            unstakeCount: 0,
            balance: 0,
            stakedBalance: 0,

            polling: null,
        }),
        computed: {
            ...mapState({
                eos: state => state.blockchain.eos,
                scatter: state => state.blockchain.scatter,
            }),
        },
        watch: {
            scatter(val) {
                if (val) this.getBalance()
            },
        },
        validations() {
            return {
                stakeCount: {
                    required,
                    between: between(1, parseFloat(this.balance)),
                },
                unstakeCount: {
                    required,
                    between: between(1, parseFloat(this.stakedBalance)),
                }
            }
        },
        mounted() {
           // this.getBalance()
            this.polling = setInterval(() => {
                this.getBalance()
                this.getFeeDiscount() // from mixin
            }, 1000)
        },
        methods: {
            stake() {
                this.eos.transaction({
                    actions: [{
                        account: 'svxmintofeos',
                        name: 'stake',
                        authorization: [{
                            actor: this.scatter.name,
                            permission: "active"
                        }],
                        data: {
                            "account": this.scatter.name,
                            "value": this.$options.filters.eosAmountFormat(this.stakeCount)
                        }

                    }]
                })
                    .then(() => {
                        this.$notice.success(`Staked ${this.stakeCount} SVX`)
                        this.getBalance() // reload data
                        this.clear()
                    })
                    .catch(error => {
                        console.error('[stake | stake]', error)
                        this.$notice.error('Stake error')
                    })
            },
            unstake() {
                this.eos.transaction({
                    actions: [{
                        account: 'svxmintofeos',
                        name: 'unstake',
                        authorization: [{
                            actor: this.scatter.name,
                            permission: "active"
                        }],
                        data: {
                            "account": this.scatter.name,
                            "value": this.$options.filters.eosAmountFormat(this.unstakeCount)
                        }
                    }]
                })
                    .then(() => {
                        this.$notice.success(`Unstaked ${this.unstakeCount} SVX`)
                        this.getBalance() // reload data
                        this.clear()
                    })
                    .catch(error => {
                        console.error('[stake | unstake]', error)
                        this.$notice.error('Unstake error')
                    })
            },
            getBalance() {
                this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => {
                    const userBalance = parseFloat(res.rows[0].balance)
                    const storeBalance = parseFloat(res.rows[0].storebalance)

                    this.balance = Math.round(userBalance - storeBalance)
                    this.stakedBalance = Math.round(storeBalance)

                })

            },
            clear() {
                this.stakeCount = 0
                this.unstakeCount = 0
            }

        },
        beforeDestroy() {
            if (this.polling) clearInterval(this.polling)
        },
    }
</script>