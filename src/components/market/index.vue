<template>
	<div style="width: 100%; height: 100%;">
		<components :is="switchView" :symbol="symbol" v-if="renderComponent"></components>
	</div>
</template>

<script>
	import mobile from './mobile'
    import desktop from './desktop'
    
	export default {
		data: () => ({
			switchView: 'desktop',
			renderComponent: true
		}),
		computed: {
			symbol() {
				return this.$route.params.symbol
			},
		},
		watch: {
			symbol(val) {
				this.forceDestroy()
			}
		},
		mounted() {
			this.setComponent()
			window.addEventListener("resize", () => this.setComponent());
		},
		methods: {
			setComponent() {
				if (document.body.clientWidth >= 600 && this.switchView === 'mobile') this.switchView = 'desktop'
				else if (document.body.clientWidth <= 600 && this.switchView === 'desktop') this.switchView = 'mobile'
			},
			forceDestroy() {
				this.renderComponent = false
				this.$nextTick(() => this.renderComponent = true)
			}
		},
		components: {
			mobile,
			desktop
		}
	}
</script>