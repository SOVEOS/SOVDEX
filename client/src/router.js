import Vue from 'vue'
import VueRouter from 'vue-router'

// routes
import home from './components/home/router'
import stake from './components/stake/router'
import market from './components/market/router'
import mine from './components/mine/router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [home, stake, market, mine],
    base: process.env.BASE_URL || '/',
})

router.beforeEach((to, from, next) => {
	next()
	if (!to.meta.title) document.title = `${to.meta.name}`
})

export default router