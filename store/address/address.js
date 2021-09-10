import api from '../../http/api.js'
export default {
	// 首页请求
	namespaced: true,
	state: {
		address: '',
		defaultAddress: ''
	},
	mutations: {
		setAddress(state, value) {
			state.address = value
		},
		setDefaultAddress(state, value) {
			state.defaultAddress = value
		},

	},
	// 异步请求
	actions: {
		async add({
			commit,
			dispatch
		}, params) {
			try {
				let res = await api.addAddress(params)
				if (res.code === 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					dispatch('getAppAddress', uni.getStorageSync('userId'))
				} else uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			} catch (err) {
				console.log(err)
			}
		},

		async del({
			commit
		}, params) {
			try {
				let res = await api.delAddress(params)
				if (res.code === 200) {
					uni.navigateBack()
					// // 	// 修改数据
					// commit('setSearchList', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async edit({
			commit
		}, params) {
			try {
				let res = await api.updateAddress(params)
				// console.log(params);
				if (res.code === 200) {
					console.log(res.data)
					// // 	// 修改数据
					// commit('setSearchList', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async setDefault({
			commit
		}, params) {
			try {
				let res = await api.setDefault(params)
				if (res.code === 200) {
					console.log(res.data)
					// // 	// 修改数据
					// commit('setSearchList', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getAppAddress({
			commit
		}, params) {
			try {
				let res = await api.getAppAddress(params)
				if (res.code === 200) {
					res.data = res.data.map(i => {
						return {
							...i,
							name: i['username'],
							tel: i['mobile'],
							address: `${i['address']}${i['detailAddress']}`,
							address_area: i['address']
						}
					})
					// let a = ''
					// res.data.map(e => {
					// 	if (e.isDefault) {
					// 		a = e
					// 	}
					// })
					// // 	// 修改数据
					commit('setAddress', res.data)
					// commit('setDefaultAddress',a)
				}
			} catch (err) {
				console.log(err)
			}
		},



	}
}
