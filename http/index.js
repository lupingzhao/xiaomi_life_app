// 先安装flyio依赖

// #ifdef APP-PLUS || APP-PLUS-NVUE || MP-WEIXIN
import Http from 'flyio/dist/npm/wx'
// #endif

// #ifdef H5
import Http from 'flyio/dist/npm/fly'
// #endif

let http = new Http

http.config.baseURL = 'http://localhost:7001/'

http.interceptors.request.use(config => {
	uni.showLoading({
		title: '加载中...'
	})
	let token = uni.getStorageSync('liftToken')
	if (token) {
		config.headers.Authorization = token
	}
	return config
}, err => {
	uni.hideLoading()
	return Promise.reject(err)
})

http.interceptors.response.use(res => {
	uni.hideLoading()
	return res.data

}, err => {
	uni.hideLoading()
	// 每次请求失败的状态码
	let status = err.response && err.response.status
	if (status === 400) {
		uni.showToast({
			title: '参数错误',
			icon: 'none'
		})
	}
	if (status === 401) {
		uni.showToast({
			title: '登录过期',
			icon: 'none'
		})
		uni.clearStorage()
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	if (status === 403) {
		uni.showToast({
			title: '没有权限',
			icon: 'none'
		})
	}
	if (status === 404) {
		uni.showToast({
			title: '路径错误',
			icon: 'none'
		})
	}
	if (status === 500) {
		uni.showToast({
			title: '服务器错误',
		})

	}
	if (status === 503) {
		uni.showToast({
			title: '服务器维护',
			icon: 'none'
		})
	}
	if (status === 422) {
		// 422	当创建一个对象时，发生了一个验证错误
		uni.showToast({
			title: '验证错误',
			icon: 'none'
		})
	}

	console.log(err)
	return Promise.reject(err)
})

export default http
