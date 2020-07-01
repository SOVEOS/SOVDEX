import Vue from 'vue'
import router from './router'
import store from './store'

import App from './components/App.vue'

import './plugins'

import './components/modules/components'
import './components/user/components'

// import static
import 'material-icons'
import './static/main.scss'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router,
})