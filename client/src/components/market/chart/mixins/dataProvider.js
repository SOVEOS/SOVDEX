import axios from 'axios'

export default {
    data: () => ({
        host: process.env.NODE_ENV == 'production' ? 'http://api.sovdex.io' : 'http://localhost:3000',
        data: [],
        streamData: {},

        polling: null
    }),
    watch: {
        interval(interval) {
            this.init({ symbol: this.symbol, interval })
        }
    },
    computed: {
        symbol() {
            return this.$route.params.symbol
        }
    },
    mounted() {
        this.init({ symbol: this.symbol })
    },
    methods: {
        init(params) {
            this.getData(params)
                .then(({ data }) => {
                    this.data = data.map(i => this.updateKline(i))
                })
                .then(() => {
                    if (this.polling) clearInterval(this.polling)
                    this.polling = setInterval(() => this.getStreamData(), 1000 * 60) // 1m upd
                })
        },
        getData(data) {
            return this.request(data)
        },
        getStreamData(data) {
            return this.request({ limit: '1', ...data })
                .then(res => {
                    const kline = res.data.data[0]
                    this.streamData = this.updateKline(kline)

                    console.log('[chart] steam data', kline)
                })
        },
        request({ symbol = 'soveos', interval = '5m', limit = '300' }) {
            return axios({
                method: 'get',
                url: this.host,
                params: { symbol, interval, limit }
            })
                .then(res => res)
                .catch(error => {
                    // this.$notice.error(error)
                    console.error(error)
                })
        },
        updateKline(val) {
            return {
                time: val.openTime / 1000,
                ...val
            }
        }
    },
    beforeDestroy() {
        if (this.polling) clearInterval(this.polling)
    },
}