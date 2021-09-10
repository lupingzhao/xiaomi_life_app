import api from '../../http/api.js'
import Vue from 'vue'
import dayjs from 'dayjs'
export default {
	// 首页请求
	namespaced: true,
	state: {
		goodData: '',
		carData: [],
		carNum: uni.getStorageSync('liftcarsum'),
		coupon: [],
		seckill: [],
		defaultAddress: ''
	},
	mutations: {
		setGoodData(state, value) {
			state.goodData = value
		},
		setCarData(state, value) {
			state.carData = value
		},
		setCarNum(state, value) {
			state.carNum = value
		},
		setCoupon(state, value) {
			state.coupon = value
		},
		setSeckill(state, value) {
			state.seckill = value
		},
		setDefaultAddress(state, value) {
			state.defaultAddress = value
		},
	},
	// 异步请求
	actions: {
		async goOut({
			commit
		}, params) {
			try {
				commit('setCarNum', 0)
			} catch (err) {
				console.log(err)
			}
		},
		async goodsDetail({
			commit
		}, params) {
			try {
				let res = await api.goodsDetail(params)
				if (res.code === 200) {
					// console.log(res);
					res.data.sellDesc = res.data.sellDesc[0].split('\n')
					commit('setGoodData', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 添加购物车
		async addCart({
			commit,
			dispatch
		}, params) {
			try {
				let res = await api.addCart(params.add)
				if (res.code === 200) {
					uni.showToast({
						title: res.msg
					})
				}
				dispatch('getCart', params.update)
			} catch (err) {
				console.log(err)
			}
		},

		async getCart({
			commit
		}, params) {
			try {
				let res = await api.getCart(params)
				if (res.code === 200) {
					res.data.map(i => {
						Vue.set(i, 'checked', false)
					})
					commit('setCarNum', res.total)
					uni.setStorageSync('liftcarsum', res.total)
					commit('setCarData', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},

		async delCart({
			commit,
			dispatch
		}, params) {
			try {
				let res = await api.delCart(params.del)
				if (res.code === 200) {
					uni.showToast({
						title: res.msg
					})
					dispatch('getCart', params.update)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async updateCart({
			commit
		}, params) {
			try {
				let res = await api.updateCart(params)
				if (res.code === 200) {}
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
					let a = ''
					res.data.map(e => {
						if (e.isDefault) {
							a = e
						}
					})
					// // 	// 修改数据
					uni.setStorageSync('DefaultAddress',a)
					commit('setDefaultAddress', a)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getCoupon({
			commit
		}, params) {
			try {
				let res = await api.getCoupon(params)
				if (res.code === 200) {
					res.data = res.data.map(i => {
						return {
							available: 1,
							condition: i['name'],
							reason: '',
							value: Number(i['amount']) * 100,
							name: i['name'],
							startAt: dayjs(i['start_time']).valueOf(),
							endAt: dayjs(i['end_time']).valueOf(),
							valueDesc: i['amount'],
							unitDesc: '元',
							description: i['threshold']
						}
					})
					commit('setCoupon', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		async getSeckill({
			commit
		}, params) {
			try {
				let res = await api.getSeckill(params)
				if (res.code === 200) {
					commit('setSeckill', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},


	}
}
