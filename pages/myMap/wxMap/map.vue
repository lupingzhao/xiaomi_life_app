<template>
	<view>
		<map id="myMap" style="width: 100%; height: 50vh;" :latitude="latitude" :longitude="longitude" :markers="markers"  show-location>
		</map>

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
					<view v-for="(i,index) in miHome[actIndex].store_list" :key="index" class="bor-b p-tb-10"
						@click="djdz(i.position,i.store_name,i)" :class="{'font-c-red':index===0}">
						<view class="font-s-14 m-tb-10">
							{{i.store_name}}
						</view>
						<view class="font-s-12">
							{{i.address}}
						</view>
						<view class="font-s-12 m-t-5">
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
				err: false,
				latitude:0,
				longitude:0,
				markers: []
			}
		},
		methods: {
			...myActions(['getStoreHome']),
			
			// 点击店铺信息
			djdz(e, n, info) {		
				uni.navigateTo({
					url: `../mapDetail?pos=${JSON.stringify(e)}&name=${n}&info=${JSON.stringify(info)}`
				})
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
				this.latitude=i[0].store_list[0].position.lat
				this.longitude=i[0].store_list[0].position.lng
				this.markers=[{
					id: 1,
					latitude: this.latitude,
					longitude: this.longitude,			
					iconPath:i[0].store_list[0].position.icon,
					width:60,
					height:60,
					label:{
						content:i[0].store_list[0].store_name,
						color:'#f68',
						bgColor:'#fff',
						padding:6,
						textAlign:'center',
					}
					
				}]		
			}
		},
	}
</script>

<style scoped lang="scss">

</style>
