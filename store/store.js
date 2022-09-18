import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleAddress from '@/store/user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'my_cart': moduleCart,
		'my_address':moduleAddress
	}
})
export default store
