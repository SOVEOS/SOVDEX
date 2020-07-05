<template>
    <div :class="_class" @click="auth" :disabled="!$store.getters.isConnected">
        <span class="material-icons">{{isAuth ? 'exit_to_app' : 'fingerprint'}}</span>
        <span class="ml05" v-if="!symbol">Sign {{isAuth ? 'out' : 'in'}}</span>
    </div>
</template>

<script>
    // https://get-scatter.com/developers/api
    // https://github.com/GetScatter/scatter-js
    import ScatterJS from '@scatterjs/core'
    import ScatterEOS from '@scatterjs/eosjs'
    import Eos from 'eosjs'

    ScatterJS.plugins(new ScatterEOS())

    export default {
        props: {
            symbol: Boolean
        },
        data: () => ({
            network: null
        }),
        watch: {
            host(val) {
                // if host change
                if (val) this.init()
            },
            '$route.name'(val) {
                // update scatter & eos on each route
                this.init()
            },
        },
        computed: {
            isAuth() {
                return this.$store.getters.isAuth
            },
            host() {
                return this.$store.state.blockchain.host
            },
            eos: {
                get() {
                    return this.$store.state.blockchain.eos
                },
                set(val) {
                    this.$store.commit('setEos', val)
                }
            },
            scatter: {
                get() {
                    return this.$store.state.blockchain.scatter
                },
                set(val) {
                    this.$store.commit('setScatter', val)
                }
            },
            _class() {
                if (this.symbol) {
                    return this.isAuth ? 'text-warning' : ''
                }
                return this.isAuth ? 'btn btn-warning' : 'btn btn-primary'
            },
        },
        mounted() {
            // if not auth already
            this.init()
            this.$bus.$on('signin', () => this.auth())
        },
        methods: {
            init() {
                const network = this.network = ScatterJS.Network.fromJson({
                    blockchain: 'eos',
                    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                    host: this.host,
                    port: 443,
                    protocol: 'https'
                })

                // connect
                ScatterJS.connect('sovdex', { network })
                    .then(connected => {

                        if (!connected) {
                            console.error('[auth] Failed to connect with Scatter')
                            this.$store.commit('setConnectStatus', false)
                            return false
                        }

                        this.eos = ScatterJS.eos(network, Eos) // set EOS
                        this.$store.commit('setConnectStatus')

                    }).catch(() => {
                        this.$store.commit('setConnectStatus', false)
                    })

            },
            auth() {
                this.isAuth ? this.logout() : this.login()
            },
            login() {
                return ScatterJS.login()
                    .then(id => {
                        if (!id) {
                            this.$notice.error('ScatterJS no identity')
                            console.error('[auth] ScatterJS no identity')
                            return false
                        }

                        this.eos = ScatterJS.eos(this.network, Eos)
                        this.scatter = ScatterJS.account('eos')

                    }).catch(err => console.log(err))
            },
            logout() {
                this.$store.commit('logout')
                return ScatterJS.logout()
                    .then(res => console.log('[auth] Sign out'))
            }
        }
    }
</script>