export default {
	path: '/market/:symbol',
	name: 'market',
	meta: {
		name: 'Market',
	},
	component: () => import('./index.vue')
}