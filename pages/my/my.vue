<template>
	<view class=" p-b-10 ">
		<image src="../../static/user/bj.png" mode="" class="width-100 pos-ab"
			style="height: 200rpx;background-color: #F37D0F;z-index: -1;"></image>

		<view class="flex jcsb font-c-w" style="height: 200rpx;">
			<view class="flex p-10">
				<view class="">
					<image src="../../static/user/touxiang.png" mode="" class="xl-img" v-if="!user.avatarUrl"></image>
					<image :src="user.avatarUrl" mode="" class="xl-img" v-else></image>
				</view>
				<view class="m-l-10" @click="go" v-if="!user">
					<text>登录</text>/
					<text>注册</text>
				</view>
				<view class="m-l-10" v-else>
					{{user.username}}
					<view class="m-t-10 font-s-12" @click="toOut">
						退出登录
					</view>
				</view>
			</view>
			<view class="p-10">
				<image src="../../static/ewm.png" mode="" class="l-img"></image>
			</view>
		</view>

		<view class="icon1"></view>

		<!-- 导航栏1 -->
		<view class="flex jcsa p-10 ">
			<view v-for="(item,index) in icon1" :key="index" class="t-a-c" @click="goNavf(index)">
				<view class="flex jcc mb-10">
					<image :src='item.icon' mode="" class="m-img"></image>
				</view>
				<view class="t-a-c">
					{{item.name}}
				</view>
			</view>
		</view>

		<!-- 导航栏2 -->
		<view class="width-90 m-c flex jcsa bgc-white b-radius-10 p-10">
			<view v-for="(item,index) in icon2" :key="index" class=" flex" @click="goNavs(index)">
				<view class="mr-5 p-tb-10">
					<view class="">
						{{item.name}}
					</view>
					<view class="m-t-5 font-s-12 text-color">
						{{item.desc}}
					</view>
				</view>
				<view class="flex jcc mb-10">
					<image :src='item.icon' mode="" class="m-img"></image>
				</view>
			</view>
		</view>
		<!-- 3 -->
		<view class="width-90 m-c flex jcsa bgc-white icon3 m-tb-10 b-radius-10 font-s-12">
			<view v-for="(item,index) in icon3" :key="index" class="" @click="goNavt(index)">
				<view class="flex jcc mb-10">
					<image :src="item.icon" mode="" class="m-img"></image>
				</view>
				<view class="">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 4 -->
		<view class="width-90  m-c flex  bgc-white m-tb-10 icon3 m-tb-10 b-radius-10 ">
			<view v-for="(item,index) in icon4" :key="index" class="mr-10" @click="goNavfo(index)">
				<view class="flex jcc mb-10">
					<image :src="item.icon" mode="" class="xl-img"></image>
				</view>
				<view class="font-s-12 t-a-c">
					{{item.name}}
				</view>
			</view>
		</view>

		<!-- 5 -->
		<navFive></navFive>

		<view class="m-tb-10">
			<recommendList></recommendList>
		</view>

		<cc-dialog :show.sync="isout" showCancelButton title="退出登录" content="退出登录状态？" @confirm='out'></cc-dialog>


	</view>

</template>

<script>
	import navFive from '../../components/my/navFive/navFive.vue'
	import recommendList from '../../components/recommentGood/recommendList.vue'

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
			navFive,
			recommendList
		},
		props: {},
		data() {
			return {
				icon1: [{
						name: '优惠券',
						icon: '../../static/yhq2.png'
					},
					{
						name: '红包',
						icon: '../../static/my1/qb.png'
					},
					{
						name: '米金',
						icon: '../../static/hg.png'
					},
					{
						name: 'F码',
						icon: '../../static/m.png'
					},
				],
				icon2: [{
						name: '会员中心',
						desc: '新权益>',
						icon: '../../static/11.png'
					},
					{
						name: '米金商城',
						desc: '限量神券>',
						icon: '../../static/22.png'
					},
					{
						name: '连接设备',
						desc: '领取米金>',
						icon: '../../static/20210902142328.png'
					},

				],
				icon3: [
					{
						name: '全部订单',
						icon: '../../static/my1/bq1.png'
					},
					{
						name: '待付款',
						icon: '../../static/my1/qb.png'
					},
					{
						name: '待收货',
						icon: '../../static/my1/dsh.png'
					},
					{
						name: '众筹抽奖',
						icon: '../../static/my1/jj.png'
					},
					
				],
				icon4: [{
						name: '小米精品推荐',
						icon: '../../static/20210902142345.png'
					},
					{
						name: '优先购',
						icon: '../../static/20210902142358.png'
					},
					{
						name: '小米榜单',
						icon: '../../static/20210902142408.png'
					},
				],
				user: null,
				isout: false
			}
		},
		methods: {
			...detailsActions(['goOut']),
			go() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			// 导航栏1 点击
			goNavf(e) {
				// console.log(1);
				if (this.user) {

				} else {
					this.go()
				}
			},
			// 导航栏2 点击
			goNavs(e) {
				// console.log(2);
				if (this.user) {

				} else {
					this.go()
				}
			}, // 导航栏3 点击
			goNavt(e) {
				if (this.user) {
         if(e===0||e===1){
					 uni.navigateTo({
					 	url:`../allOrder/all?index=${e}`
					 })
				 }
				} else {
					this.go()
				}
			},
			// 导航栏4 点击
			goNavfo(e) {
				console.log(4);
				if (this.user) {

				} else {
					this.go()
				}
			},
			toOut() {
				this.isout = true
			},
			// 确定退出
			out() {
				this.goOut()
				uni.clearStorageSync()
				uni.switchTab({
					url: '../index/index'
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.user = uni.getStorageSync('liftUser')
		},
		filters: {},
		computed: {

		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.my {
		position: relative;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -22;
	}

	.icon1 {
		background-color: #F37D0F;
		position: absolute;
		height: 250rpx;
		left: 0;
		right: 0;
		z-index: -1;
		border-bottom-left-radius: 20%;
		border-bottom-right-radius: 20%;
	}

	.icon3 {
		padding: 30rpx 20rpx;
	}
</style>
