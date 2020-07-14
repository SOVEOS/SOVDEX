export default {
    data: () => ({
        legend: ''
    }),
    watch: {
        chart() {
            this.chart.subscribeCrosshairMove((param) => {
                if (param.time) {

                    const ohlc = param.seriesPrices.get(this.series)
                    const volume = param.seriesPrices.get(this.histogramSeries)

                    this.legend = `O${parseFloat(ohlc.open)} H${parseFloat(ohlc.high)} L${parseFloat(ohlc.low)} C${parseFloat(ohlc.close)}` + (volume ? `<br>Volume ${Math.round(volume)}` : ``)

                    return false
                }

                this.legend = ''
            });
        }
    }
}