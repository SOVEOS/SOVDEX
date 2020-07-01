export default {
    data: () => ({
        histogramSeries: null
    }),
    watch: {
        chart() {
            this.createHistogramSeries()
        },
        data(val) {
            if (val && this.chart) {
                const bars = val.map(i => this.updateHistogramData(i))
                this.histogramSeries.setData(bars)
            }
        },
        updatedData(val) {
            if (val) {
                const bar = this.updateHistogramData(val)
                this.histogramSeries.update(bar)
            }
        }
    },
    mounted() {

    },
    methods: {
        createHistogramSeries() {
            this.histogramSeries = this.chart.addHistogramSeries({
                priceFormat: {
                    type: 'volume',
                },
                priceLineVisible: false,
                overlay: true,
                scaleMargins: {
                    top: 0.85,
                    bottom: 0,
                },
            })

            // dont delete init data
            this.histogramSeries.setData([{ time: "2018-12-20", value: 20.31 }])
        },
        updateHistogramData(val) {
            return { time: val.time, value: val.volume }
        }
    }
}