import api from '../../http/api.js'
export default {
	// 首页请求
	namespaced: true,
	state: {
		cateData: '',
	},
	mutations: {
		setCateData(state, value) {
			state.cateData = value
		},
	


	},
	// 异步请求
	actions: {
		// 异步操作同步化: 用一个变量接收请求的结果
		// 每个action的方法有且仅有两个参数 第一个参数是store对象 第二个参数是请求的参数
		// commit=  this.state.commit
		async getCategory({
			commit
		}, params) {
			try {
				let res = await api.getCategory()
				if (res.code===200) {
					// 修改数据
					let data=[]
					res.data.map(i=>{
						data.push({...i,title:i.name})
					})
					// console.log(data)
					commit('setCateData',data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		
		
	}
}
