export default {
	path: '/market/:symbol',
	name: 'market',
	meta: {
		name: 'Market',
	},
	beforeEnter: (to, from, next) => {
		!to.params.symbol ? next({ name: 'market', params: { symbol: 'soveos' } }) : next()
	},
	beforeRouteUpdate(to, from, next) {
		!to.params.symbol ? next({ name: 'market', params: { symbol: to.params.symbol } }) : next()
	},
	component: () => import('./index.vue')
}