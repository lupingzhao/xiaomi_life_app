<template>
	<view>
		<view class="bgc-low-gray" id="container" style="height: 40vh;">
			<!-- 	<view class="t-a-c m-t-10" v-if="err">定位失败</view> -->
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
								zoom: 13 //地图显示的缩放级别
							});

							// 添加插件 导航
							AMap.plugin('AMap.Driving')

							//构造路线导航类
							var driving = new AMap.Driving({
								map: this.map,
								// panel: "panel"
							})
							// 根据起终点经纬度规划驾车导航路线
							driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281,
								39.903719), (status, result) => {
								if (status === 'complete') {
									console.log(result);
									console.log('绘制驾车路线完成')
								} else {
									console.log('获取驾车数据失败：' + result)
								}
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
			this.setmap()
		},
		onLoad(e) {},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
