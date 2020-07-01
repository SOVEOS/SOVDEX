<template>
		<div class="columns">
			<div class="column col-6" v-for="(i,index) in markets" :key="index">
				<router-link class="btn btn-sm btn-block" :to="{name: 'market', params:{ symbol: i.symbol }}"
					v-html="i.name" tag="button" :class="[i.symbol == $route.params.symbol ? 'btn-primary' : 'btn-link' ]" :disabled="i.symbol == 'sovusdt'" />
			</div>
		</div>
</template>

<script>

	export default {
		data: () => ({
			markets: [
				/*
				{
					name: 'eos/pbtc',
					symbol: 'eospbtc'
				},
				*/
				{
					name: 'sov/eos',
					symbol: 'soveos'
				},
				/*
				{
					name: 'sov/usdt',
					symbol: 'sovusdt'
				},
				*/
				{
					name: 'svx/eos',
					symbol: 'svxeos'
				}
			],
		}),
	}
</script>

<style lang="scss" scoped>
	.columns {
		margin: -0.25rem;
		.column {
			padding: 0.25rem;
		}
	}
</style>