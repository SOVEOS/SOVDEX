<template>
	<div ref="modal">
		<!--Btn-->
		<a @click="toggle" v-show="!event && !button">{{name}}</a>
		<div v-show="button" @click="toggle">
			<slot name="button"></slot>
		</div>
		<!--Modal-->
		<div class="modal active" :class="_class" v-show="show">
			<transition name="fade">
				<div class="modal-overlay" @click="toggle" v-if="show"></div>
			</transition>
			<transition name="animation">
				<div class="modal-container" v-if="show">
					<div class="modal-header">

						<div class="content-padding unit" v-if="!header">
							<div class="unit-section modal-title">{{name}}</div>
							<div class="unit-section">
								<span class="material-icons link" @click="toggle"> close </span>
							</div>
						</div>

						<slot name="header"></slot>
					</div>
					<div class="modal-body">
						<slot name="body"></slot>
					</div>
					<div class="modal-footer" v-if="footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'event', '_class'],
		data: () => ({
			show: false
		}),
		mounted() {
			// this.$bus.$emit('<event-name>') -> this.$bus.$on('<event-name>')
			if (this.event) this.$bus.$on(this.event, this.toggle)
		},
		computed: {
			header() {
				return !!this.$slots.header
			},
			footer() {
				return !!this.$slots.footer
			},
			container() {
				return !!this.$slots.container
			},
			button() {
				return !!this.$slots.button
			},
		},
		methods: {
			toggle() {
				(this.show) ? this.show = false : this.show = true
				// this.$refs.modal.style.transform = 'translateY(0%)'
				this.$emit('open', this.show)
			},
		},
	}
</script>

<style lang="scss">
	// Overlay
	.fade-enter-active,
	.fade-leave-active {
		transition: .20s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	// Modal content
	.animation-enter-active,
	.animation-leave-active {
		transition: all .3s;
	}
	.animation-enter,
	.animation-leave-to {
		transform: translate3d(0, 100%, 0);
	}
</style>