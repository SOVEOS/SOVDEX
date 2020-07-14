<template>
    <div class="content ">
        <div class="content-header content-padding">
            <div class="unit" v-if="isDataLoaded">
                <div class="unit-section p-relative">
                    <span class="text-sm text-secondary p-absolute" v-html="legend" style="line-height: 15px;"></span>
                </div>
                <div class="unit-section">
                    <intervals v-model="interval" />
                </div>
            </div>
        </div>
        <div class="content-body">
            <div class="loading loading-lg fill" v-show="!isDataLoaded"></div>
            <div class="fill" ref="chart" v-show="isDataLoaded"></div>
        </div>
    </div>
</template>

<script>
    import { createChart } from 'lightweight-charts'

    // mixins
    import dataProvider from './mixins/dataProvider'
    import legend from './mixins/legend'
    import preloader from './mixins/preloader'
    // import volume from './mixins/volume'

    // components
    import intervals from './intervals'

    const defaultData = [
        { time: "2018-12-19", open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
        { time: "2018-12-20", open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
        { time: "2018-12-21", open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
        { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: "2018-12-23", open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    ]

    export default {
        mixins: [dataProvider, legend, preloader], // volume, 
        data: () => ({
            interval: '4h',
            chart: null,
            series: null,
        }),
        mounted() {
            this.createChart()

            // resize observer
            const ro = new ResizeObserver(entries => {
                const cr = entries[0].contentRect
                this.resize(cr.width, cr.height)
            })

            ro.observe(this.$refs.chart)
        },
        methods: {
            createChart() {
                this.$refs.chart.innerHTML = '' // clear for developing

                this.chart = createChart(this.$refs.chart, {
                    width: this.$refs.chart.innerWidth,
                    height: this.$refs.chart.innerHeight,
                    crosshair: {
                        mode: 0,
                    },
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: false,
                        borderVisible: false,
                    },
                    layout: {
                        backgroundColor: '#1e2023',
                        textColor: 'rgba(255,255,255, .5)',
                    },
                    priceScale: {
                        borderColor: 'rgba(255,255,255, .1)',
                    },
                    grid: {
                        vertLines: {
                            color: 'rgba(255,255,255, .1)',
                        },
                        horzLines: {
                            color: 'rgba(255,255,255, .1)',
                        }
                    },
                })

                this.series = this.chart.addCandlestickSeries({
                    priceFormat: {
                        type: 'custom',
                        minMove: 0.00000001,
                        formatter: (price) => price.toFixed(8),
                    }
                })

                // dont delete init data
                this.series.setData(this.data ? this.data : defaultData)
            },
            resize(width, height) {
                this.chart.resize(width, height)
            },
            reCreateChart() {
                this.chart.removeSeries(this.series)
                this.chart = null
                this.createChart() // create chart again
            }
        },
        watch: {
            '$route.params.symbol'(val){
                this.reCreateChart()
            },
            interval(val) {
                this.reCreateChart()
            },
            isDataLoaded(val) {
                this.reCreateChart()
            },
        },
        components: {
            intervals
        }
    }
</script>

<style lang="scss" scoped>
    .fill {
        width: 100%;
        height: 100%;
    }
</style>