<template>
	<view>
		<view class="bgc-low-gray" id="container" style="height: 40vh;">
			<!-- 	<view class="t-a-c m-t-10" v-if="err">定位失败</view> -->
		</view>
		<view class="p-10" v-if="route">
			<scroll-view scroll-y="true" style="height: 60vh">
				<view class="mb-10 bor-b p-b-10">
					{{route.policy}}
				</view>
				<view class="mb-10 bor-b p-b-10">
					过路费：{{route.tolls}}元
				</view>
				<view class="mb-10 bor-b p-b-10">
					总里程：{{route.distance/1000}}公里
				</view>
				<view class="mb-10 bor-b p-b-10">
					距离出口收费站距离还有：{{route.tolls_distance/1000}}公里
				</view>
				
				<view >
					<view v-for="(item,index) in route.steps" :key="index" class="p-10 font-s-14">
						{{item.action}}: &nbsp;{{item.instruction}}
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	// #ifdef H5
	const key = '8beb154cd241eec3682a22c06d2e3d95'
	import AMapLoader from '@amap/amap-jsapi-loader'
	// #endif



	export default {
		components: {},
		props: {},
		data() {
			return {
				// 路线
				route: ''
			}
		},
		methods: {
			setmap(LngLat, now, name) {
				// #ifdef H5
				let _this = this
				return new Promise((resovle, reject) => {
					AMapLoader.load({
							key,
							version: '1.4.15',
							Loca: {
								// 是否加载 Loca， 缺省不加载
								version: '1.3.2' // Loca 版本，缺省 1.3.2
							}
						})
						.then(AMap => {
							//基本地图加载
							this.map = new AMap.Map("container", {
								resizeEnable: true,
								center: [LngLat.lng, LngLat.lat], //地图中心点
								zoom: 13 //地图显示的缩放级别
							});

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


							this.map.plugin('AMap.Driving', function() {
								var driving = new AMap.Driving({
									// 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
									policy: AMap.DrivingPolicy.LEAST_TIME
								})
								var startLngLat = [now.lng, now.lat]
								var endLngLat = [LngLat.lng, LngLat.lat]


								driving.search(startLngLat, endLngLat, function(status, result) {
									_this.route = result.routes[0]
									// 未出错时，result即是对应的路线规划方案
								})
							})

						})
						.catch(e => {
							console.log(e)
						})
				})
				// #endif
			}
		},
		mounted() {

		},
		onLoad(e) {
			this.setmap(JSON.parse(e.pos), JSON.parse(e.nowpos), e.name)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
