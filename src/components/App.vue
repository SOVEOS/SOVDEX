<template>
    <div class="content">
        <div class="z-index-1" style="box-shadow: 0 0 10px rgba(0,0,0,.1);">
            <theader />
        </div>
        <div class="content-body">
            <router-view v-if="$store.getters.isAuth"></router-view>
            <isConnected v-else />
        </div>
        <div class="content-footer z-index-1" style="box-shadow: 0 0 10px rgba(0,0,0,.1);">
            <bottomNavigation />
        </div>

        <settings />
    </div>
</template>

<script>
    import theader from './modules/navigation/header'
    import bottomNavigation from './modules/navigation/bottomNavigation'

    import isConnected from './modules/isConnected'

    import balance from './user/balance'
    import settings from './user/settings'

    export default {
        mounted() {
            // https://github.com/nikitamarcius
            console.log('%c Developed by Nikita Marcius', 'background: #5490f1; color: white; display: block;', 'https://github.com/nikitamarcius')
        },
        components: {
            theader,
            bottomNavigation,
            isConnected,

            balance,
            settings,
        }
    }
</script>