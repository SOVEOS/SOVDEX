import Vue from 'vue'
import Vuex from 'vuex'
import { vuexLocal } from './VuexPersistence'

Vue.use(Vuex)

// Modules
import blockchain from './blockchain'

export default new Vuex.Store({
    state: {},
    modules: {
        // user,
        blockchain,
    },
    plugins: [vuexLocal.plugin],
})