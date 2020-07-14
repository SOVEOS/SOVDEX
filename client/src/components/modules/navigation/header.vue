<template>
    <div class="header flex-centered bg-secondary hide-sm">
        <div class="container grid-xl">
            <div class="unit">
                <div class="unit-section">
                    <div class="tile tile-list" style="line-height: 20px;">
                        <div class="tile-section tile-icon">
                            <figure class="icon" style="background-color: transparent;">
                                <img src="image\logo.svg" height="40px">
                            </figure>
                        </div>
                        <div class="tile-section">
                            <div class="text-bold">SOVDEX</div>
                            <div class="text-sm text-secondary" v-if="$store.getters.isAuth">
                                @{{$store.state.blockchain.scatter.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="unit-section">
                    <router-link v-if="$store.getters.isAuth" v-for="(i,idx) in schema" :to="i.route"
                        :key="idx" class="link link-padding" :class="{'active' : i.route.name == $route.name}">{{i.name}}
                    </router-link>
                    <span v-if="$store.getters.isAuth" class="link link-padding material-icons"
                        @click="$bus.$emit('settings')">settings_input_antenna</span>
                    <auth class="ml" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import auth from '../../user/auth'

    export default {
        data: () => ({
            schema: [
                {
                    name: 'Stake',
                    route: { name: 'stake' }
                },
                {
                    name: 'Exchange',
                    route: { name: 'market', params: { symbol: 'soveos' } }
                },
                {
                    name: 'Mine',
                    route: { name: 'mine' }
                }
            ]
        }),
        components: {
            auth
        }
    }
</script>