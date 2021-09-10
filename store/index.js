import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index.js'
import category from './category/index.js'
import goods from './goods/goods.js'
import api from '../http/api.js'
import seach from './seach/index.js'
import login from './login/index.js'
import my from './my/my.js'
import address from './address/address.js'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		regood:[],
		carSum:uni.getStorageSync('liftcarsum')
	},
	mutations: {
		setCarSum(state, value) {
			state.carSum = value
		},
		setReGood(state, value) {
			state.regood = value
		},

	},
	actions: {
		async getRecommend({
			commit
		}, params) {
			try {
				let res = await api.getRecommend()
				if (res.code===200) {								
					commit('setReGood',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getHot({
			commit
		}, params) {
			try {
				let res = await api.getHot()
				if (res.code===200) {								
					commit('setReGood',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
	},
	
	modules:{
		home,
		category,
		goods,
		seach,
		login,
		my,
		address
	}
})
export default store
