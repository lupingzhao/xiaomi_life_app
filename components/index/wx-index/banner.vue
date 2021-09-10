<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<cc-swiper @click="handleClick" :list="banner" imgMode="scaleToFill	"></cc-swiper>
		<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	
	<view class="p-b-10" >
		<view class="bb pos-ab " ></view>
		<view class="width-90 m-c b-radius-10 p-t-10" style="overflow: hidden;">
			<cc-swiper @click="handleClick" :list="banner" imgMode="scaleToFill	"></cc-swiper>
		</view>
	</view>
	
	<!-- #endif -->
		<view class="p-10 flex flex-wrap jcsa bgc-white">
			<view v-for="(item,index) in nav" :key="index" class="width-20" @click="goto(index)">
				<image :src='item.url' mode="" class="width-100" style="height: 150rpx;"></image>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let indexModeule = createNamespacedHelpers('home')
	// 解构模块化里的数据与请求方法
	let {
		mapState: indexState,
		mapActions: indexActions
	} = indexModeule


	export default {
		components: {},
		props: {},
		data() {
			return {}
		},
		methods: {
			...indexActions(['getBanner','getNav']),
			// 轮播图点击
			handleClick(e){
				// #ifndef MP-WEIXIN
				console.log(e)
					window.open(e.item.link,'_self')
				// #endif
			
				// #ifdef MP-WEIXINA 
				// 复制
				uni.setClipboardData({
					data: e.item.link,
				});
				// #endif
			},
			// 去秒杀
			goto(e){
				if(!e){
					uni.navigateTo({
						url:'/pages/seckill/seckill'
					})
				}
			}
		},
		mounted() {
			this.getBanner()
			this.getNav()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			// 解构模块化中的数据
			...indexState(['banner','nav'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
.bb{
		width: 100%;
		height: 140px;
		position: absolute;
		z-index: 0;
		overflow: hidden;
	}

	.bb::after {
		content: '';
		width: 120%;
		height: 100px;
		position: absolute;
		left: -10%;
		top: 0;
		z-index: 0;
		border-radius: 0 0 60% 60%;
		background: #FF6900;
	}
	
</style>
