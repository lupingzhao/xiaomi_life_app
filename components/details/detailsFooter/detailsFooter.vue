<template>
	<view class="foot">
		<!-- 底部导航栏 -->
		<view class="bottom  flex jcsa p-5 font-s-12 t-a-c p-lr-10">
			<view class="icon " @click="goto">
				<view class="flex jcc">
					<image src='../../../static/tabbar/icon-home.png' mode="" class="bottom-img"></image>
				</view>
				<view class="">
					首页
				</view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="icon" @click="toServe">
				<cc-badge dot>
					<view class="flex jcc">
						<image src='../../../static/kefu.png' mode="" class="bottom-img"></image>
					</view>
					<view class="">
						客服
					</view>
				</cc-badge>
			</view>
			<!-- #endif -->

			<view class="icon pos-rel" @click="goCar">
				<text class="bage" v-if="carNum"> {{carNum}}</text>
				<view class="flex jcc">
					<image src="../../../static/icon/cart.png" mode="" class="bottom-img"></image>
				</view>
				<view class="">
					购物车
				</view>
			</view>
			<view class="flex box-btn jcc font-c-w mr-10">
				<!-- #ifdef MP-WEIXIN -->
				<view class="car flex-1" @click="addcar">
					加入购物车
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="car flex-1" @click="addcar ">
					加入购物车
				</view>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
				<view class="buy flex-1" @click="tobuy">
					立即购买
				</view>
				<!-- #endif -->

			</view>

		</view>

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
			}
		},
		methods: {
			// 去首页
			goto() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// // 检查是否登录
			// checkLogin(){
			// 	this.$utils
			// },
			goCar() {
				uni.switchTab({
					url: '/pages/car/car'
				})
			},
			addcar() {
				this.$emit('open', 'add')
			},
			tobuy() {
				this.$emit('open', 'buy')
			},
			// 客服
			toServe(){
				uni.navigateTo({
					url:'/pages/customerService/customerService'
				})
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
			...detailsState(['carNum'])
			// carSum() {
			// 	return this.$store.state.carSum
			// }
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.foot {
		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100vw;
			background-color: #FFFFFF;
			border-top: 1rpx solid #F1F1F1;
			z-index: 99999;

			.bottom-img {
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 10rpx;

			}

			.bage {
				background-color: #DD524D;
				width: 40rpx;
				height: 40rpx;
				padding: 3rpx;
				border-radius: 100%;
				color: #FFFFFF;
				position: absolute;
				z-index: 2;
				right: -5rpx;
				top: -20rpx;
			}

			.icon {
				width: 13%;
				text-align: center;
				// padding: 20rpx;
			}

			.box-btn {
				width: 60%;
				border-radius: 35rpx;
				overflow: hidden;
			}

			/* #ifndef MP-WEIXIN */
			.car {
				width: 50%;
				text-align: center;
				padding: 20rpx;
				background-image: linear-gradient(to right, #FFD916, #FF940E);
			}

			/* #endif */
			/* #ifdef MP-WEIXIN */
			.car {
				width: 90%;
				text-align: center;
				padding: 20rpx;
				border-radius: 30rpx;
				font-size: 14px;
				background-color: #FF750B;
				// background-image: linear-gradient(to right, #FFD916, #FF940E);
			}

			/* #endif */

			.buy {
				width: 50%;
				text-align: center;
				padding: 20rpx;
				background-image: linear-gradient(to right, #FF532B, #FF0A1C);
			}

			// background-image: linear-gradient(to right, yellow , red);	
		}

	}
</style>
