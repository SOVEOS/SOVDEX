<template>
    <div class="content ">
        <div class="content-header content-padding">
            <div class="unit">
                <div class="unit-section p-relative">
                    <span class="text-sm text-secondary p-absolute" v-html="legend" style="line-height: 15px;"></span>
                </div>
                <div class="unit-section">
                    <intervals v-model="interval" />
                </div>
            </div>
        </div>
        <div class="content-body">
            <div ref="chart" style="width:100%; height:100%;"></div>
        </div>
    </div>
</template>

<script>
    import { createChart } from 'lightweight-charts'

    // mixins
    import dataProvider from './mixins/dataProvider'
    //
    import legend from './mixins/legend'

    // import volume from './mixins/volume'

    // components
    import intervals from './intervals'

    export default {
        mixins: [dataProvider, legend], // volume, 
        data: () => ({
            interval: '5m',
            chart: null,
            series: null,
        }),
        mounted() {

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
                    backgroundColor: '#f2f3f4',
                    textColor: 'rgba(0,0,0, .5)'
                },
                priceScale: {
                    borderColor: 'rgba(0,0,0, .1)',
                }
            })

            this.series = this.chart.addCandlestickSeries({
                priceFormat: {
                    type: 'custom',
                    minMove: 0.000001,
                    formatter: (price) => price.toFixed(6),
                }
            })

            // dont delete init data
            this.series.setData([
                { time: "2018-12-19", open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
                { time: "2018-12-20", open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
                { time: "2018-12-21", open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
                { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
                { time: "2018-12-23", open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
            ])

            // resize observer
            const ro = new ResizeObserver(entries => {
                const cr = entries[0].contentRect
                this.resize(cr.width, cr.height)
            })

            ro.observe(this.$refs.chart)

        },
        methods: {
            resize(width, height) {
                this.chart.resize(width, height)
            }
        },
        watch: {
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
        components: {
            intervals
        }
    }
</script>