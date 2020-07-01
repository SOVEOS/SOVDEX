lines (68 sloc)  1.8 KB
  
<template>
	<div class="bottom-navigation show-sm">

		<div class="container grid-xs height100">
			<div class="unit">
				<router-link class="unit-section bottom-navigation-item" :to="{name:i.route}" v-for="(i,index) in schema"
					tag="div" :key="index" :class="{'active': i.route == $route.name}">
					<span class="material-icons">{{i.icon}}</span>
					<span class="bottom-navigation-label">{{i.name}}</span>
                </router-link>

                <div class="unit-section bottom-navigation-item" @click="$bus.$emit('settings')">
                    <span class="material-icons">settings</span>
                    <span class="bottom-navigation-label">Settings</span>
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
                    route: 'stake',
                    icon: 'account_balance_wallet'
                },
                {
                    name: 'Exchange',
                    route: 'market',
                    icon: 'cached'
                },
                {
                    name: 'Mine',
                    route: 'mine',
                    icon: 'monetization_on'
                }
            ]
        }),
        components: {
            auth
        }
    }
</script>