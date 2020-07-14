lines (68 sloc)  1.8 KB
<template>
	<div class="bottom-navigation show-sm" v-if="$store.getters.isAuth">

		<div class="container grid-xs height100">
			<div class="unit">
				<router-link class="unit-section bottom-navigation-item" :to="i.route" v-for="(i,idx) in schema"
					tag="div" :key="idx" :class="{'active': i.route.name == $route.name}">
					<span class="material-icons">{{i.icon}}</span>
					<span class="bottom-navigation-label" v-if="i.route.name == $route.name">{{i.name}}</span>
                </router-link>

                <div class="unit-section bottom-navigation-item" @click="$bus.$emit('settings')">
                    <span class="material-icons">settings_input_antenna</span>
                    <!--span class="bottom-navigation-label" >Settings</span-->
                 </div>

                <div class="unit-section bottom-navigation-item active">
                    <auth :symbol="true" />
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
                    route: {name: 'stake'},
                    icon: 'account_balance'
                },
                {
                    name: 'Exchange',
                    route: {name: 'market', params: {symbol: 'soveos'}},
                    icon: 'trending_up'
                },
                {
                    name: 'Mine',
                    route: {name: 'mine'},
                    icon: 'whatshot'
                }
            ]
        }),
        components: {
            auth
        }
    }
</script>