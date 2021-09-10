import api from '../../http/api.js'
import vue from 'vue'
export default {
	// 首页请求
	namespaced: true,
	state: {
		user: ''
	},
	mutations: {
		setUser(state, data) {
			state.user = data
		},

	},
	// 异步请求
	actions: {
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// commit=  this.state.commit
		async register({
			commit
		}, params) {
			try {
				let res = await api.register(params)
				if (res.code === 200) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					})
				uni.navigateBack()
				}else uni.showToast({
					title:res.msg,
					icon:'none'
				})
			} catch (err) {
				console.log(err)
			}
		},

		async mobileLogin({
			commit
		}, params) {
			try {
				let res = await api.mobileLogin(params)
				// console.log(params);
				if (res.code === 200) {
					uni.showToast({
						title: res.msg,
						icon:'none'
					})
					// uni.switchTab({
					// 	url:'/pages/my/my'
					// })
					uni.navigateBack()
					uni.setStorageSync('liftUser',res.data)
					uni.setStorageSync('userId',res.data._id)
				}else{
					uni.showToast({
						title: res.msg,
						icon:'none'
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		async userLogin({
			commit
		}, params) {
			try {
				let res = await api.userLogin(params)
				// console.log(params);
				if (res.code === 200) {
					uni.showToast({
						title:res.msg
					})
					uni.navigateBack()
						uni.setStorageSync('liftUser',res.data)
						uni.setStorageSync('liftToken',res.token)
						uni.setStorageSync('userId',res.data._id)
					// 	// 修改数据
				}else{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			} catch (err) {
				console.log(err)
			}
		},

		async getCode({
			commit
		}, params) {
			try {
				let res = await api.getCode(params)
			} catch (err) {
				console.log(err)
			}
		},



	}
}
