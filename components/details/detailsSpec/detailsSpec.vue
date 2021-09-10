<template>
	<view class="bgc-white p-10">
		<cc-sticky :offsetTop="90" >
		<cc-tabs @change="change" :current="current"  :list="list">			
		</cc-tabs>
		<view class="m-t-5 html-box" v-if="current===0"  v-html="goodData.detail" style="line-height: 0;width: 100vw;"></view>
			<view class="m-t-5 html-box" v-if="current===1" v-html="goodData.specParams" style="line-height: 0;width: 100vw;"></view>	
		
		</cc-sticky>
		
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let detailsModeule = createNamespacedHelpers('goods')
	// 解构模块化里的数据与请求方法
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModeule
	
	
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: [{
						title: '商品详情'
					},
				],
				current:0,
				datas:''
			}
		},
		methods: {
			change(e){
				this.current=e
				// console.log(e)
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(['goodData'])
		},
		watch: {
			goodData(val){
				if(val.specParams){
					return( this.list=[{
						title: '商品详情'
					},{
						title: '商品参数'
					},
				])
				}
			}
		},
	}
</script>

<style scoped lang="scss">
.html-box{
	z-index: -99 !important;
	position: relative;
}
</style>
