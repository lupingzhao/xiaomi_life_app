<template>
	<view class=" m-c">
		<view class="width-90 p-lr-10 ">
			<view class="flex jcsb p-tb-10">
				<view class="font-s-16 font-w-7">
					我的服务
				</view>
				<view class='font-s-12'>
					查看更多 &nbsp;>
				</view>
			</view>
		</view>


		<view class="width-90 p-10 m-c flex flex-wrap  bgc-white m-tb-10 icon3 m-tb-10 b-radius-10 ">
			<view v-for="(item,index) in icon5" :key="index" class="width-25 m-tb-10" @click="goto1(index)">
				<view class="flex jcc mb-10">
					<image :src="item.icon" mode="" style="width: 100rpx; height: 100rpx;"></image>
				</view>
				<view class="font-s-12 t-a-c">
					{{item.name}}
				</view>
			</view>
		</view>

		<view class="flex jcsa width-90 p-10 bgc-white b-radius-10 m-c">
			<view v-for="(item,index) in icon6" :key="index" @click="goto(index)">
				<view class="flex jcc mb-10">
					<image :src="item.icon" mode="" class="m-img"></image>
				</view>
				<view class="font-s-12 t-a-c">
					{{item.name}}
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				icon5: [{
						name: '小米之家',
						icon: '/static/my1/20210902142442.png'
					},
					{
						name: '服务网点',
						icon: '/static/my1/20210902142625.png'
					},
					{
						name: '耗材服务',
						icon: '/static/my1/20210902142635.png'
					}, {
						name: '在线说明书',
						icon: '/static/my1/20210902142705.png'
					}, {
						name: '在线客服',
						icon: '/static/my1/20210902142715.png'
					},
					{
						name: '以旧换新',
						icon: '/static/my1/20210902142635.png'
					},
					{
						name: '安装服务',
						icon: '/static/my1/20210902142727.png'
					},
					{
						name: 'MiCare',
						icon: '/static/my1/20210902142819.png'
					},
				],
				icon6: [{
						name: '收货地址',
						icon: '/static/my1/20210902142833.png'
					},
					{
						name: '礼物码',
						icon: '/static/my1/20210902142914.png'
					},
					{
						name: '智能定制',
						icon: '/static/my1/20210902142924.png'
					}, {
						name: '关于',
						icon: '/static/my1/20210902142934.png'
					},
				],
				user:uni.getStorageSync('liftUser')
			}
		},
		methods: {
			// 去地址管理
			goto(e) {
				if (this.user) {
					if (!e) {
						uni.navigateTo({
							url: `../address/address?boo=${0}`
						})
					}else if(e===1){
					uni.showToast({
						title:'暂未开发此功能',
						icon:'none'
					})
					}
				}			
			},
			// 去地图
			goto1(e) {
				if (!e) {
					if (this.user) {					
						uni.navigateTo({
							url:'/pages/my/cityList/cityList'
						})
					}				
				}else if(e===4){
					uni.navigateTo({
						url:'/pages/customerService/customerService'
					})
				}
			}
		},
		mounted() {

		},
		onLoad() {

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
