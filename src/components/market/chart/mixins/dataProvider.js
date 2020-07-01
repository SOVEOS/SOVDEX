import axios from 'axios'

export default {
    data: () => ({
        data: [],
        streamData: {},
        schema: {
            'soveos': 'sovmintofeos-sov-eos',
            'svxeos': 'svxmintofeos-svx-eos',
        },

        polling: null
    }),
    watch: {
        interval(interval) {
            this.init({ symbol: this.symbol, interval })
        }
    },
    computed: {
        symbol() {
            return this.schema[this.$route.params.symbol] || this.schema['soveos']
        }
    },
    mounted() {
        this.init({ symbol: this.symbol })
    },
    methods: {
        init(params) {
            this.getData(params)
                .then(({ data }) => {
                    this.data = data.data.map(i => this.updateKline(i))
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
        request({ symbol = 'sovmintofeos-sov-eos', interval = '1hour', limit = '300' }) {
            // https://github.com/newdex/api-docs/blob/master/api/REST_api_reference.md
            return axios.get(`https://api.newdex.io/v1/candles?symbol=${symbol}&time_frame=${interval}&size=${limit}`)
                .then(res => res)
                .catch(error => {
                    // this.$notice.error(error)
                    console.error(error)
                })
        },
        updateKline(val) {
            return {
                time: val[0],

                open: val[1],
                close: val[2],
                high: val[3],
                low: val[4],

                volume: val[5],
            }
        }
    },
    beforeDestroy() {
        if (this.polling) clearInterval(this.polling)
    },
}