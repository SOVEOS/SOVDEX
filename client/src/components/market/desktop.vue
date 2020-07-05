<template>
	<div class="market-layout" v-if="symbol">
		<div class="market-chart">
			<chart :symbol="symbol" />
		</div>
		<div class="p-relative content" style="width: 250px;">
			<div class="content-header">
				<markets style="padding: 7px 0 5px 0;" />
			</div>
			<div class="content-body flex-centered">
				<createOrder :symbol="symbol" />
			</div>
		</div>
	</div>
</template>

<script>
	import chart from './chart'
	import markets from './modules/markets'
	import createOrder from './modules/createOrder'

	export default {
		props: ['symbol'],
		components: {
			chart,
			markets,

			createOrder,
		}
	}
</script>

<style lang="scss">
	.market-layout {
		overflow: hidden;
		display: grid;
		height: 100%;
		grid-template-columns: 1fr auto;
		grid-template-rows: 100%;

	}
</style>