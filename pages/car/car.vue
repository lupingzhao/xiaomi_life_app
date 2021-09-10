<template>
	<view class="bgc-low-gray car">
		<!-- 头部 -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="p-10 flex jcsb bgc-low-gray ">
			<view class="" @click="goback">
				<image src="../../static/back.png" class="s-img" mode=""></image>
			</view>
			<view class="">
				购物车
			</view>
			<view class="" @click="goseach">
				<image src="../../static/sousuo.png" class="m-img" mode=""></image>
			</view>
		</view>
		<!-- #endif -->

		<!-- 登录 -->
		<!-- <carLogin v-if="user"></carLogin> -->
		<checkedlist v-if="user" ref='list'></checkedlist>
		<!-- 未登录 -->
		<loginOut v-else></loginOut>


		<!-- 底部推荐商品 -->
		<view class="bgc-white">
			<recommendList></recommendList>
		</view>
	</view>

</template>

<script>
	import loginOut from '../../components/car/loginOut.vue'
	import checkedlist from '../../components/car/checked.vue'
	import recommendList from '../../components/recommentGood/recommendList.vue'
	import carLogin from '../../components/car/carLogin.vue'
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
		components: {
			loginOut,
			recommendList,
			carLogin,
			checkedlist
		},
		props: {},
		data() {
			return {
				user: ''
			}
		},
		methods: {
			...detailsActions(['getCart', ]),
			// 去搜索
			goseach() {
				uni.navigateTo({
					url: '../seach/seachView'
				})
			},
			// 返回
			goback() {
				uni.navigateBack()
			}
		},
		mounted() {

		},
		onLoad() {

		},
		// 页面隐藏
		onHide() {
			// this.$refs.list.ol()
		},
		onShow() {
			this.user = uni.getStorageSync('liftUser')
			if (this.user) {
				this.getCart(uni.getStorageSync('userId'))
			}
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.car {
		padding-bottom: 100rpx;
	}
</style>
