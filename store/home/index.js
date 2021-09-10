import api from '../../http/api.js'
export default {
	// 首页请求
	namespaced: true,
	state: {
		homeData: [],
		banner: [],
		nav:'',
		reNav:'',
		newGoods:[],
		navGoods:[],
		notice:[]
	},
	mutations: {
		setHomeData(state, value) {
			state.homeData = value
		},
		setBanner(state, data) {
			state.banner = data
		},
		setNav(state,data){
			state.nav=data
		},
		setReNav(state,data){
			state.reNav=data
		},
		setNewGoods(state,data){
			state.newGoods=data
		},
		setNavGoods(state,data){
			state.navGoods=data
		},
		setNotice(state,data){
			state.notice=data
		},

	},
	// 异步请求
	actions: {
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// commit=  this.state.commit
		async getBanner({
			commit
		}, params) {
			try {
				let res = await api.getBanner()
				if (res.code===200) {
					let data=[]
					res.data.map((i)=>{
						data.push({...i, image:i.url})
					})
					data=data.filter((i)=>{
						return i.isShow
					})
					// console.log(data)
				// 	// 修改数据
					commit('setBanner', data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		
		async getNav({
			commit
		}, params) {
			try {
				let res = await api.getNav()
				if (res.code===200) {
					// console.log(res.data)
				// 	// 修改数据
					commit('setNav',res.data )
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 推荐导航栏
		async getRecommendNav({
			commit
		}, params) {
			try {
				let res = await api.getRecommendNav()
				if (res.code===200) {
					// console.log(res.data)
					commit('setReNav',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 新品	
		async getNew({
			commit
		}, params) {
			try {
				let res = await api.getNew()
				if (res.code===200) {
					// console.log(res.data)
					commit('setNewGoods',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		
		//推荐导航商品
		async getNavGoods({
			commit
		}, params) {
			try {
				let res = await api.getNavGoods(params)
				if (res.code===200) {				
					commit('setNavGoods',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 通知
		
		async getNotice({
			commit
		}, params) {
			try {
				let res = await api.getNotice()
				if (res.code===200) {				
					commit('setNotice',res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		
	}
}
