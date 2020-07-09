import Vue from 'vue'

import VueNotice from '@marcius-studio/vue-notice'
Vue.use(VueNotice)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// https://github.com/dumptyd/vue-css-donut-chart
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css'
Vue.use(Donut)


// filters
Vue.filter('eosAmountFormat', (val, symbol = 'SVX') => {
    let decimalPlaces = (symbol == 'pbtc') ? 8 : 4
    return parseFloat(val).toFixed(decimalPlaces) + ` ${symbol.toUpperCase()}`
})


// Global bus event
Vue.prototype.$bus = new Vue()
