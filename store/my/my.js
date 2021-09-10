import api from '../../http/api.js'

export default {
	// 首页请求
	namespaced: true,
	state: {
		all: [],
		cityList: [],
		areaList: [],
		miHome: [],
		homeInfo:''
	},
	mutations: {
		setAll(state, value) {
			state.all = value
		},
		setCityList(state, value) {
			state.cityList = value
		},
		setAreaList(state, value) {
			state.areaList = value
		},
		setMiHome(state, value) {
			state.miHome = value
		},
		setHomeInfo(state, value) {
			state.homeInfo = value
		},
	},
	// 异步请求
	actions: {
		async getAppOrder({
			commit
		}, params) {
			try {
				let res = await api.getAppOrder(params)
				if (res.code === 200) { // // 	// 修改数据
					commit('setAll', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},

		async addOrder({
			commit
		}, params) {
			try {
				let res = await api.addOrder(params)
			} catch (err) {
				console.log(err)
			}
		},
		async delOrder({
			commit
		}, params) {
			try {
				let res = await api.delOrder(params)
				if (res.code === 200) {
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
				}
			} catch (err) {
				// console.log(err)
			}
		},
		async createComment({
			commit
		}, params) {
			try {
				let res = await api.createComment(params)
				// console.log(params);
				if (res.code === 200) {
					uni.showToast({
						title: res.msg
					})
				}
			} catch (err) {
				// console.log(err)
			}
		},

		// 获取城市
		async getAreaList({
			commit
		}, params) {
			try {
				let res = await api.getAreaList(params)
				// console.log(params);
				if (res.code === 200) {
					// // 	// 修改数据
					commit('setCityList', res.data)
				}
			} catch (err) {
				// console.log(err)
			}
		},

		// 搜索城市
		async searchAreaList({
			commit
		}, params) {
			try {
				let res = await api.searchAreaList(params)
				if (res.code === 200) {
					// // 	// 修改数据
					commit('setAreaList', res.data.data.area_list)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 小米之家
		async getStoreHome({
			commit
		}, params) {
			try {
				let res = await api.getStoreHome(params)
				// console.log(params);
				if (res.code === 200) {
					commit('setMiHome', res.data.data.store_type_list)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 店铺信息
		async getStoreDetail({
			commit
		}, params) {
			try {
				let res = await api.getStoreDetail(params)
				// console.log(params);
				if (res.code === 200) {
					commit('homeInfo',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},




	}
}
