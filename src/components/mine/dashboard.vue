<template>
    <div class="section">
        <div class="section-item section-item-filled">
            <div class="columns">
                <div class="column col-4">
                    <vc-donut :sections="[section('cpu')]" :size="70" :unit="'%'" :thickness="10" :has-legend="true"
                        :text="cpu.value + '%'" :auto-adjust-text-size="false" />
                </div>
                <div class="column col-4">
                    <vc-donut :sections="[section('node')]" :size="70" :unit="'%'" :thickness="10" :has-legend="true"
                        :text="node.value + '%'" :auto-adjust-text-size="false" />
                </div>
                <div class="column col-4">
                    <vc-donut :sections="[section('net')]" :size="70" :unit="'%'" :thickness="10" :has-legend="true"
                        :text="net.value + '%'" :auto-adjust-text-size="false" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    // https://github.com/dumptyd/vue-css-donut-chart

    import { mapState } from 'vuex'

    export default {
        data: () => ({
            cpu: { value: 10, label: 'CPU', color: '#5490f1' },
            node: { value: 90, label: 'SVX node', color: '#5490f1' },
            net: { value: 70, label: 'NET', color: '#5490f1' },

            polling: null
        }),
        computed: mapState({
            eos: state => state.blockchain.eos,
            scatter: state => state.blockchain.scatter,
        }),
        watch: {
            scatter(val) {
                if (val) this.getData()
            },
        },
        mounted() {
            this.getData()
            this.polling = setInterval(() => this.getData(), 1000)
        },
        beforeDestroy() {
            if (this.polling) clearInterval(this.polling)
        },
        methods: {
            section(name) {
                let section = this[name]
                section.color = name == 'node' ? this.setNodeColor(section.value) : this.setColor(section.value)
                return section
            },
            setColor(value) {
                if (value >= 0 && value <= 60) return '#00bb00'
                if (value > 60 && value <= 75) return '#ffaa00'

                return '#ff5555'
            },
            setNodeColor(value){
                if (value > 25 && value <= 50) return '#ffaa00'
                if (value > 50 && value <= 75) return '#5bc0de'
                if (value > 75 && value <= 99) return '#0275d8'
                if (value > 99) return '#00bb00'

                return '#ff5555'
            },
            getData() {
                const percent = (val, val2) => (val < val2) ? (val / val2) * 100 : (val2 / val) * 100

                this.eos.getAccount(this.scatter.name)
                    .then(res => {
                        const cpu = percent(res.cpu_limit.used, res.cpu_limit.max)
                        const net = percent(res.net_limit.used, res.net_limit.max)
                        const node = null

                        this.cpu.value = parseFloat(cpu.toFixed(2))
                        this.net.value = parseFloat(net.toFixed(2))

                        this.getSVXNode()
                    })

            },
            getSVXNode() {
                this.eos.getTableRows({
                    "json": "true",
                    "code": "svxmintofeos",
                    "scope": this.scatter.name,
                    "table": "accounts"
                }).then(res => {
                    if (res) {
                        const svxPower = parseFloat(res.rows[0].svxpower.replace('SVX', ''))

                        const node = (svxPower / 777000) * 100
                        this.node.value = Math.floor(node)
                    }

                }).catch(err => console.log(err))
            }
        },

    }
</script>