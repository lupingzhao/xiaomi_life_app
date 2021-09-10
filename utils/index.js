// 封装公共的方法
import dayjs from 'dayjs'
// #ifdef H5
const key = '8beb154cd241eec3682a22c06d2e3d95'
import AMapLoader from '@amap/amap-jsapi-loader'
// #endif

// #ifdef MP-WEIXIN
const amapFile = require('../lib/amap-wx.js')
const key = 'd7549ad51cff75fb27df6434d5e44173'
const myAmapFun = new amapFile.AMapWX({
	key
})
// #endif


export default {
	countdown(time1, time2) {

		let now = dayjs().valueOf()
		let t1 = dayjs(time1).valueOf()
		let t2 = dayjs(time2).valueOf()
		let c1 = now - t1
		let c2 = (t2 - t1)
		let pre = (c1 / c2) * 100
		if (now > t1) {
			if (c1 / c2 >= 1) {
				return 100
			} else {
				let c = Number(pre.toFixed(0))
				return c
			}
		} else {
			return 0
		}

	},
	// 查询是否登陆
	// key: 本地存储用户信息的key 储存的名字
	// next: 传入一个函数 单独定义一个函数
	// item: next函数需要的参数 下一步的操作
	checkLogin({
		key,
		next,
		item
	}) {
		// 
		let user = uni.getStorageSync(key)
		if (user) {
			next(item)
		} else {
			uni.showModal({
				title: '登录',
				content: '当前为未登录状态',
				confirmText: '去登录',
				success(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			})
			// // 未登录
			// Dialog.confirm({
			//   title: '检测到您未登录',
			//   message: '是否立即跳转到登录页面?',
			// }).then(() => {
			//   // 跳转到登录页
			//   router.push('/Login')
			// }).catch(() => {
			//   Toast('您取消了操作')
			// })
		}
	},

	// 定位
	getLocation(LngLat, name) {
		// #ifdef H5
		// new Promise 是使一个方法按照发请求的形式返回数据 
		return new Promise((resovle, reject) => {
			// resovle 相当于 res.code===200 的时候返回的数据
			// reject 相当于res.code !==200 的时候返回的数据
			AMapLoader.load({
					key,
					version: '1.4.15',
					Loca: {
						// 是否加载 Loca， 缺省不加载
						version: '1.3.2' // Loca 版本，缺省 1.3.2
					}
				})
				.then(AMap => {
					
					if (LngLat) {
						// view 的id名
						this.map = new AMap.Map('container', {
							center: [Number(LngLat.lng), Number(LngLat.lat)],
							zoom: 15
						})

						let content =
							`<div class='box-map t-a-c p-10 b-radius-10' style='font-size: 12px;width: 200px;background-color: #FFFFFF;margin-left: -72px; margin-top: -63px;'><img src='${LngLat.icon}' class='xl-img' /><div class='box-map'>${name}</div></div>`


						// 创建一个 Marker 实例： 多个标价循环创建

						let marker = new AMap.Marker({
							position: new AMap.LngLat(Number(LngLat.lng), Number(LngLat
								.lat)), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
							content: content
						});
						// 将创建的点标记添加到已有的地图实例：
						this.map.add(marker);
						
					}else{
						this.map = new AMap.Map('container', {
							zoom: 15
						})
					}


					return this.map.plugin('AMap.Geolocation', function() {
						var geolocation = new AMap.Geolocation({
							// 是否使用高精度定位，默认：true
							enableHighAccuracy: true,
							// 设置定位超时时间，默认：无穷大
							timeout: 10000,
							// 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
							buttonOffset: new AMap.Pixel(10, 20),
							//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
							zoomToAccuracy: true,
							//  定位按钮的排放位置,  RB表示右下
							buttonPosition: 'RB'
						})

						geolocation.getCurrentPosition(function(status, result) {
							if (status == 'complete') {
								onComplete(result)
							} else {
								onError(result)
							}
						})

						function onComplete(data) {
							// data是具体的定位信息
							resovle({
								code: 200,
								msg: '定位成功',
								data
							})
							// console.log(data)
						}

						function onError(data) {
							// 定位出错
							reject({
								code: 500,
								msg: '定位失败',
								data
							})
						}
					})
				})
				.catch(e => {
					// 请求返回失败返回的数据
					console.log(e)
				})
		})
		// #endif
		// #ifdef MP-WEIXIN
		return new Promise((resovle, reject) => {
			myAmapFun.getRegeo({
				success: data => {
					//成功回调
					resovle({
						code: 200,
						msg: '定位成功',
						data
					})
					// console.log(data)
				},
				fail: info => {
					//失败回调
					reject({
						code: 500,
						msg: '定位失败',
						info
					})
					console.log(info)
				}
			})
		})
		// #endif
	},

	// 保存历史记录
	saveHistory({
		key,
		data,
		attr
	}) {
		// key是名字 data是保存的数据, 
		// attr是属性名 用来判断是否重复 属性名是一个字符串 不是变量
		//  让名字格式化
		// 根据不同用户获取相应的记录 用户登陆时 单独储存用户的userid  是唯一的
		let name
		let userId = uni.getStorageSync('userId')
		if (userId) {
			name = key + 'History' + userId
		} else {
			name = key + 'History'
		}
		// 获取该名字的记录	
		let history = uni.getStorageSync(name)
		// 无数据为null 或undefind
		// 存储获取到的值
		let stu;
		// 是否存在这个数据名 
		if (history) {
			//检测搜索记录存在时
			stu = uni.getStorageSync(name)
			// 将新数据加入
			stu.unshift(data);
		} else {
			//不存在时
			stu = []; //存储数据形式
			stu.unshift(data);
		}
		//是否有传判断参数进来
		if (attr) {
			const res = new Map();
			stu = stu.filter(stu => !res.has(stu[attr]) && res.set(stu[attr], 1))
		} else {
			stu = Array.from(new Set(stu))
		}
		// localStorage[name] = stuStr;
		uni.setStorageSync(name, stu)

	},
	// 删除历史记录
	delhistory(key) {
		let name
		let userId = uni.getStorageSync('userId')
		if (userId) {
			name = key + 'History' + userId
		} else {
			name = key + 'History'
		}
		uni.removeStorageSync(name)
	},


	// 删除单个记录
	delHistoryOne({
		key,
		value,
		// id判断额属性名是字符串
		id
	}) {
		// key 数据名 value 数据值 id判断额属性名是字符串
		// 根据不同用户获取相应的记录 用户登陆时 单独储存用户的userid  是唯一的
		let name
		let userId = uni.getStorageSync('userId')
		if (userId) {
			name = key + 'History' + userId
		} else {
			name = key + 'History'
		}
		let stu = uni.getStorageSync(name)
		if (stu) {
			if (id) {
				stu = stu.filter((a) => {
					return a[id] !== value[id];
				});
			} else {
				stu = stu.filter((a) => {
					return a !== value;
				});
			}
			if (stu.length === 0) {
				uni.removeStorageSync(name)
			} else {
				uni.setStorageSync(name, stu)
			}
		} else {
			return
		}
	},
	// 循环里面删除单个 可以传index
	delMapOne({
		key,
		index,
	}) {
		// key 数据名 value 数据值 id判断额属性名是字符串
		// 根据不同用户获取相应的记录 用户登陆时 单独储存用户的userid  是唯一的
		let name
		let userId = uni.getStorageSync('userId')
		if (userId) {
			name = key + 'History' + userId
		} else {
			name = key + 'History'
		}
		let stu = uni.getStorageSync(name)
		// 根据下标删除
		if (stu) {
			stu.splice(index, 1)
			uni.setStorageSync(name, stu)
			if (stu.length === 0) {
				uni.removeStorageSync(name)
			} else {
				uni.setStorageSync(name, stu)
			}
		} else {
			return
		}
	},
	// 获取记录
	// key；储存的名字
	getHistory(key) {
		// 根据不同用户获取相应的记录 用户登陆时 单独储存用户的userid  是唯一的
		let name
		let userId = uni.getStorageSync('userId')
		if (userId) {
			name = key + 'History' + userId
		} else {
			name = key + 'History'
		}
		let arr = uni.getStorageSync(name)
		if (arr) return arr
		else return null
	},

	//获取用户是否登陆
	// loadash去重 第一个参数是需要去重的数据 数组或对象数组
	// uniqWith(title.value, isEqual)
}
