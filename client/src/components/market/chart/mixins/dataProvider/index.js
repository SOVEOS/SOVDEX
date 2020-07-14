import axios from 'axios'

import stream from './stream'

export default {
    mixins: [stream],
    data: () => ({
        host: 'https://api.sovdex.io',// process.env.NODE_ENV == 'production' ? 'https://api.sovdex.io' : 'http://localhost:3000',
        data: [],
        isDataLoaded: false,
    }),
    watch: {
        interval(interval) {
            this.getData({ symbol: this.symbol, interval })
        },
        series(val) {
            if (this.data.length > 0) this.series.setData(this.data)
        },
        data(val) {
            if (val.length > 0 && this.series) {
                this.series.setData(val)

                // if not set, chart will be empty
                this.chart.applyOptions({
                    priceScale: {
                        borderVisible: false,
                        autoScale: false,
                    },
                })
            }
        },
        streamData(val) {
            if (this.series) this.series.update(val)
        }
    },
    computed: {
        symbol() {
            return this.$route.params.symbol
        }
    },
    mounted() {
        this.getData({ symbol: this.symbol, interval: this.interval })
    },
    methods: {
        getData(params) {
            this.request(params).then(({ data }) => {
                if (data.length > 0) {
                    this.data = this.updateCandles(data)
                    this.isDataLoaded = true // disable preloader
                }
            })
        },
        updateCandles(data) {
            return data.map(i => ({ time: i.openTime / 1000, ...i }))
        },
        request({ symbol = 'soveos', interval = '5m', limit = '300' }) {
            return axios({
                method: 'get',
                url: this.host,
                params: { symbol, interval, limit }
            })
                .then(res => res)
                .catch(error => console.error(error))
        },
    },
}