<template>
    <div class="section">
        <div class="section-item section-item-filled">
            <div class="toast mb">
                <div class="mb05"> Burn Mining <span class="text-primary">1 SVX</span> Burns <span
                        class="text-warning text-semibold">{{miningCost}} SOV</span></div>
                <ul class="text-sm">
                    <li>Reward per mining action: <span class="text-primary">{{miningRate}}</span> SVX</li>
                    <li>Reward per mining transaction: <span class="text-primary">{{total.miningRate}}</span> SVX</li>
                    <li>Total Burn per mining transaction: <span class="text-error">{{total.burn}}</span> SOV</li>
                    <li>Bonus for staking SVX: <span class="text-success">{{bonus}}%</span></li>
                </ul>
            </div>
            <div class="form-group mb05">
                <input type="number" class="form-input" v-model="targetMiningRate" min="0" step="0.01" required>
                <label>Mining rate</label>
            </div>
            <div class="text-sm text-secondary mb">
                Mine when single action reward is ≥ {{targetMiningRate}}
            </div>

            <button class="btn btn-primary btn-block mb05" @click="submit"> Burn mine x{{range}} </button>

            <input type="range" v-model="range" min="1" max="200" step="1" class="slider mb">

            <label class="form-switch flex-centered-vertical">
                <input type="checkbox" v-model="isAuto">
                <i class="form-icon"></i>
                <span class="text-secondary text-sm ml05">Auto mine</span>
            </label>

        </div>

        <div class="text-sm text-secondary text-center">Bundled burn mining actions per transaction</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            targetMiningRate: 0,
            quantity: 150, // default value
            range: 1,
            isAuto: false,

            // statistic
            miningRate: 0,
            bonus: 0,

            pollingIsAuto: null,
            polling: null,
        }),
        computed: {
            ...mapState({
                eos: state => state.blockchain.eos,
                scatter: state => state.blockchain.scatter,
            }),
            total() {
                return {
                    miningRate: parseFloat((this.miningRate * this.range).toFixed(4)) || 0,
                    burn: parseFloat(((this.quantity * 0.014) * this.range).toFixed(2)) || 0,
                }
            },
            miningCost() {
                const cost = (this.total.burn / this.total.miningRate).toFixed(4)
                return cost == Infinity ? 0 : cost
            }
        },
        watch: {
            isAuto(val) {
                if (val) {
                    this.submit() // init
                    this.pollingIsAuto = setInterval(() => this.submit(), 5000) // 5s
                    this.$notice.info('Auto mine <b>start</b>')

                    return false
                }

                if (this.pollingIsAuto) {
                    clearInterval(this.pollingIsAuto)
                    this.$notice.warning('Auto mine <b>stop</b>')
                }
            },
        },
        mounted() {
            if (this.scatter) this.getData()
            this.polling = setInterval(() => this.getData(), 1000)
        },
        beforeDestroy() {
            // clear if component destroy
            if (this.polling) clearInterval(this.polling)
        },
        methods: {
            async getData() {
                if (this.scatter && this.eos) {
                    const svxMiningSupply = await this.eos.getTableRows({
                        "json": "true",
                        "code": "svxmintofeos",
                        "scope": "svxmintofeos",
                        "table": "accounts"
                    }).then(res => parseFloat(res.rows[0].balance))

                    const svxSupply = await this.eos.getTableRows({
                        "json": "true",
                        "code": "svxmintofeos",
                        "scope": "SVX",
                        "table": "stat"
                    }).then(res => parseFloat(res.rows[0].supply))

                    // user account
                    const res = await this.eos.getTableRows({
                        "json": "true",
                        "code": "svxmintofeos",
                        "scope": this.scatter.name,
                        "table": "accounts"
                    })

                    if (svxMiningSupply, svxSupply, res) {
                        const svxPower = res.rows[0].svxpower

                        let bonusPercentage = (parseFloat(svxPower) / parseFloat(svxSupply)) * 10000
                        bonusPercentage = bonusPercentage > 50 ? 50 : 0

                        let miningRate = (svxMiningSupply / 20000) * (1 + (bonusPercentage / 100)) * 1 // mining_multiplier
                        miningRate = this.miningRate = miningRate.toFixed(4)

                        // set values
                        this.miningRate = miningRate
                        this.miningBonus = bonusPercentage
                    }
                }
            },
            submit() {
                if (this.miningRate > this.targetMiningRate)
                    this.eos.transaction({
                        actions: [{
                            account: 'sovmintofeos',
                            name: 'transfer',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "from": this.scatter.name,
                                "to": 'sovdexrelays',
                                "quantity": this.$options.filters.eosAmountFormat(this.quantity, 'SOV'),
                                "memo": 'mine SVX'
                            }

                        }]
                    }).then(() => {
                        console.log('[mine] Success')
                        if (!this.isAuto) this.$notice.success('Mine success')
                    }).catch(error => console.error(error))
            }
        },
    }
</script>

<style lang="scss" scoped>
    ul {
        margin: 0;

        li {
            margin-top: 0;
        }
    }
</style>