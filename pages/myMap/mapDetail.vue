<template>
	<view>
		<!-- #ifdef H5 -->
		<view class="bgc-low-gray" id="container" style="height: 35vh;">
			<view class="t-a-c m-t-10" v-if="err">定位失败</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<map id="myMap" style="width: 100%; height: 50vh;" :latitude="latitude" :longitude="longitude"
			:markers="markers" show-location>
		</map>
		<!-- #endif -->

		<!-- 信息 -->
		<view class="" v-if="info">
			<view class="flex p-10 bor-b" style="white-space: normal;">
				<view class="" style="white-space: normal;width: 200rpx;">
					店铺名称：
				</view>
				<view class="width-70 font-s-14">
					{{info.store_name}}
				</view>
			</view>

			<view class="p-10 bor-b">
				<view class="mb-10">
					营业时间
				</view>
				<view class="font-s-12">
					{{info.shop_time}}
				</view>
			</view>

			<view class="p-10 flex jcsb bor-b">
				<view class="" style="width: 80vw;">
					<view class="mb-10">
						地址
					</view>
					<view class="font-s-12">
						{{info.address}}
					</view>
				</view>
				<view class="t-a-c" @click="goline">
					<image src="../../static/mihome/go.png" class="m-img" mode=""></image>
					<view class="font-s-12"> 到这去</view>
				</view>
			</view>

			<view class="p-10 flex jcsb bor-b">
				<view class="">
					<view class="mb-10">
						电话
					</view>
					<view class="font-s-12 width-80">
						{{info.tel}}
					</view>
				</view>
				<view class="t-a-c">
					<!-- :tel='info.tel' -->
					<a :href="'tel:' + info.tel" style="text-decoration:none;">
						<image src="../../static/mihome/phone.png" class="m-img" mode=""></image>
						<view class="font-s-12"> 去联系</view>
					</a>
				</view>
			</view>
			<a href="tel:0147-88469258"></a>
			<view class="p-10 bor-b">
				<view class="mb-10">
					支持服务
				</view>
				<view class="font-s-12 flex flex-wrap">
					<view v-for="(item,index) in info.support_service" :key="index" class="mr-5 mb-10">
						{{item}}<text v-if="index<info.support_service.length-1">,</text>
					</view>
				</view>
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
				err: false,
				info: '',
				pos: '',
				nowpos: '',
				latitude: 0,
				longitude: 0,
				markers: []
			}
		},
		methods: {
			...myActions(['getStoreDetail']),
			// 线路导航
			goline(e) {
				if (this.nowpos) {
					uni.navigateTo({
						url: `./mapLine/mapLine?pos=${JSON.stringify(this.pos)}&nowpos=${JSON.stringify(this.nowpos)}&name=${this.info.store_name}`
					})
				} else {
					uni.showToast({
						title: '暂未获取到当前定位,请稍等',
						icon: 'none'
					})
				}
			}
		},
		mounted() {

		},
		onLoad(e) {
			this.pos = JSON.parse(e.pos)
			this.info = JSON.parse(e.info)
			
			
			// 创建地图
			// #ifdef H5
			this.$utils.getLocation(this.pos, e.name).then(res => {
				this.nowpos = res.data.position
			}).catch(err => {
				this.err = true
			})
			// #endif
			

			// #ifdef MP-WEIXIN
			this.latitude = this.pos.lat
			this.longitude =this.pos.lng
			this.markers = [{
				id: 1,
				latitude: this.latitude,
				longitude: this.longitude,
				iconPath: this.pos.icon,
				width: 60,
				height: 60,
				label: {
					content: this.info.store_name,
					color: '#f68',
					bgColor: '#fff',
					padding: 6,
					textAlign: 'center',
				}

			}]

			// #endif


		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['homeInfo'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
