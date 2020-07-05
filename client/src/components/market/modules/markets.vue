<template>
	<div class="columns col-gapless col-oneline" >
		<div class="column col-4 col-sm-3" v-for="(i,idx) in markets" :key="idx" >
			<router-link class="btn btn-sm btn-block" :to="{name: 'market', params:{ symbol: i.symbol }}"
				v-html="i.name" tag="button" style="height: 30px;"
				:class="[i.symbol == $route.params.symbol ? 'btn-primary' : 'btn-link' ]" />
		</div>
	</div>
</template>

<script>

	export default {
		data: () => ({
			markets: [
				{
					name: 'sov/eos',
					symbol: 'soveos'
				},
				{
					name: 'svx/eos',
					symbol: 'svxeos'
				},
				{
					name: 'sov/usdt',
					symbol: 'sovusdt'
				},
				{
					name: 'eos/pbtc',
					symbol: 'eospbtc'
				},
				{
					name: 'eos/pbtc',
					symbol: 'powpbtc'
				},
			],
		}),
	}
</script>

<style lang="scss" scoped>
	button {
		border-radius: 0;
		height: inherit;
	}

	.columns {
		margin: 0;

		.column {
			padding: 0;
		}
	}

/*
	@media only screen and (min-width: 600px) {
		.columns.col-oneline {
			overflow: hidden;
			flex-wrap: wrap;
		}
		}
*/

	
</style>