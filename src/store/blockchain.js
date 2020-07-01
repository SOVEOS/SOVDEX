import Eos from 'eosjs'

export default {
    state: {
        scatter: null, // Global Scatter Object
        eos: Eos({}), // Global Eos Obj
        host: 'api.main.alohaeos.com',
        isConnected: false
    },
    getters: {
        isAuth: (state) => !!state.scatter && state.eos,
        isConnected: (state) => state.isConnected,
    },
    mutations: {
        setEos(state, payload) {
            state.eos = { ...state.eos, ...payload }
        },
        setScatter(state, payload) {
            state.scatter = payload
        },
        setHost(state, payload) {
            state.host = payload
        },
        setConnectStatus(state, payload = true) {
            state.isConnected = payload
        },
        logout(state) {
            state.scatter = null
            state.eos = Eos({})
            localStorage.clear
        }
    },
}