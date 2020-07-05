import VuexPersistence from 'vuex-persist'

export const vuexLocal = new VuexPersistence({
	key: 'vuex',
	storage: localStorage,
})