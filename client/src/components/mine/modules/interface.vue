<template>
    <div class="section">
        <div class="section-item section-item-filled">
            <div class="toast mb">
                <div class="mb05">Mining <span class="text-primary">1 SVX</span> Burns <span
                        class="text-warning text-semibold">{{miningCost}} SOV</span></div>
                <ul class="text-sm">
                    <li>Reward per action: <span class="text-primary">{{miningRate}}</span> SVX</li>
                    <li>Reward per transaction: <span class="text-primary">{{total.miningRate}}</span> SVX</li>
                    <li>Total Burn per ransaction: <span class="text-error">{{total.burn}}</span> SOV</li>
                    <li>Bonus for staking SVX: <span
                            :class="[miningBonus >= 50 ? 'text-success' : 'text-warning']">{{miningBonus}}%</span></li>
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

            <bars :isAuto="isAuto" />

        </div>
        <div class="text-sm text-secondary text-center">Bundled mining actions per transaction</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import bars from './bars'

    export default {
        data: () => ({
            targetMiningRate: 0,
            quantity: 150,
            range: 1,
            isAuto: false,

            // statistic
            miningRate: 0,
            miningBonus: 0,

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
            scatter(val) {
                if (val) this.getData()
            },
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
            this.polling = setInterval(() => this.getData(), 1000)
        },
        methods: {
            getData() {
                const svxMiningSupplyPromise = this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": "svxmintofeos",
                    "table": "accounts"
                })

                const svxSupplyPromise = this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": "SVX",
                    "table": "stat"
                })

                const svxPowerPromise = this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                })

                Promise.all([svxMiningSupplyPromise, svxSupplyPromise, svxPowerPromise])
                    .then(res => {
                        const svxMiningSupply = parseFloat(res[0].rows[0].balance)
                        const svxSupply = parseFloat(res[1].rows[0].supply)
                        const svxPower = parseFloat(res[2].rows[0].svxpower)

                        let bonusPercentage = (svxPower / svxSupply) * 10000
                        bonusPercentage = bonusPercentage > 50 ? 50 : Math.floor(parseFloat(bonusPercentage).toFixed(2))

                        let miningRate = (svxMiningSupply / 20000) * (1 + (bonusPercentage / 100)) * 1 // mining_multiplier

                        // set values
                        this.miningRate = parseFloat(miningRate.toFixed(4))
                        this.miningBonus = bonusPercentage
                    })
            },
            submit() {
                const myRange = this.range
                const action = {

                            account: 'sovmintofeos',
                            name: 'transfer',
                            authorization: [{
                                actor: this.scatter.name,
                                permission: "active"
                            }],
                            data: {
                                "from": this.scatter.name,
                                "to": 'sovdexrelays',
                                "quantity": '150.0000 SOV',
                                "memo": 'mine SVX'
                            }
                        }


                if (this.miningRate > this.targetMiningRate)

                console.log("======================")
                console.log(action)

                var theactions = []
                for (var i =0; i < myRange; i++) {
                    theactions[i] = action
                }
                console.log(theactions)

                    this.eos.transaction({
                        actions: theactions
                        }).then(() => {
                        console.log('[mine] Success')
                        if (!this.isAuto) this.$notice.success('Mine success')

                        this.$bus.$emit('tick')
                    }).catch(error => console.error(error))
            }
        },
        beforeDestroy() {
            // clear if component destroy
            if (this.polling) clearInterval(this.polling)
        },
        components: {
            bars
        }
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
