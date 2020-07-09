import axios from 'axios'

import stream from './stream'

export default {
    mixins: [stream],
    data: () => ({
        host: process.env.NODE_ENV == 'production' ? 'http://api.sovdex.io' : 'http://localhost:3000',
        data: [],
    }),
    watch: {
        interval(interval) {
            this.getData({ symbol: this.symbol, interval })
        }
    },
    computed: {
        symbol() {
            return this.$route.params.symbol
        }
    },
    mounted() {
        this.getData({ symbol: this.symbol })
    },
    methods: {
        getData(params) {
            this.request(params).then(({ data }) => {
                if (data.length > 0) this.data = this.updateCandles(data)
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