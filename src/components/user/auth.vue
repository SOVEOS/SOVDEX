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
        watch: {
            host(val) {
                // if host change
                if (val) this.init()
            },
        },
        computed: {
            isAuth() {
                return this.$store.getters.isAuth
            },
            host() {
                return this.$store.state.blockchain.host
            },
            _class() {
                if (this.symbol) {
                    return this.isAuth ? 'text-warning' : ''
                }
                return this.isAuth ? 'btn btn-warning' : 'btn btn-primary'
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
            }
        },
        mounted() {
            // if not auth already
            if (!this.scatter) {
                this.init()
                this.$bus.$on('signin', () => this.auth())
            }

            //setInterval(()=> this.checkStatus(), 5000)
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

                        this.eos = ScatterJS.scatter.eos(network, Eos) // set EOS
                        this.$store.commit('setConnectStatus')

                    }).catch(() => {
                        this.$store.commit('setConnectStatus', false)
                    })

            },
            checkStatus() {
                try {
                    ScatterJS.connect('sovdex', { network: this.network })
                    this.$store.commit('setConnectStatus')
                }
                catch {
                    this.$store.commit('setConnectStatus', false)
                }
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

                        this.scatter = ScatterJS.account('eos')

                    }).catch(err => console.log(err))
            },
            logout() {
                return ScatterJS.logout()
                    .then(res => {
                        this.$store.commit('logout')
                        console.log('[auth] Sign out')
                    })
            }
        }
    }
</script>