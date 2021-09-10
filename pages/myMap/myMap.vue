<template>
	<view>
		<view class="bgc-low-gray" id="container" style="height: 50vh;">
			<view class="t-a-c m-t-10" v-if="err">定位失败</view>
		</view>

		<view class="p-10">
			<view class="flex ">
				<view v-for="(item,index) in miHome" class="p-10 bgc-low-gray b-radius-10 mr-10" :key="index"
					v-if="item.store_list&&item.store_list.length>0&&index<2" :class="{'red':index===actIndex}"
					@click="actIndex=index">
					<text v-if="item.store_list&&item.store_list.length>0">
						{{item.type_name==='offline'?'服务网点':'小米之家'}}
					</text>
				</view>
			</view>

			<view class="">
				<scroll-view scroll-y="true" style="height: 35vh;padding-bottom: 20rpx;" v-if="miHome.length">
					<view v-for="(i,index) in miHome[actIndex].store_list" :key="index" class="bor-b p-tb-10" @click="djdz(i.position,i.store_name,i)" :class="{'font-c-red':index===0}">
						<view class="font-s-14 m-tb-10">
							{{i.store_name}}
						</view>
						<view class="font-s-12">
							{{i.address}}
						</view>
						<view class="font-s-12 m-t-5" >
							{{i.shop_time}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let myModeule = createNamespacedHelpers('my')
	// 解构模块化里的数据与请求方法
	let {
		mapState: myState,
		mapActions: myActions
	} = myModeule

	export default {
		components: {},
		props: {},
		data() {
			return {
				type: ['小米之家', '服务网点'],
				actIndex: 0,
				err: false
			}
		},
		methods: {
			...myActions(['getStoreHome']),
			// 创建地图
			getmap(e, n) {
				this.$utils.getLocation(e, n).then(res => {
				}).catch(err => {
					this.err = true
				})
			},
			// 点击店铺信息
			djdz(e,n,info){
				// #ifdef H5
				uni.navigateTo({
					url:`./mapDetail?pos=${JSON.stringify(e)}&name=${n}&info=${JSON.stringify(info)}`
				})
				// #endif
			
			}

		},
		mounted() {


		},
		onLoad(e) {
			this.getStoreHome(e)
		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['miHome'])
		},
		watch: {
			miHome(i) {
				// 默认的经纬度				
				this.getmap(i[0].store_list[0].position, i[0].store_list[0].store_name)
			}

		},
	}
</script>

<style scoped lang="scss">
	.red {
		border: 1rpx solid #ff0000;
	}

	.box-map {
		background-color: #FFFFFF;
		width: 200px !important;
	}
</style>
