<template>
	<view class="p-10">
		<!-- 地址 -->
		<view class="width-90 p-10 flex jcsb m-c bgc-low-gray b-radius-10" @click="goadress">
			<view class="flex font-s-12 " v-if="aadress">
				<image src="../../static/my1/20210902142442.png" mode="" class="xl-img"></image>
				<view class="m-l-10">
					<view class="mb-10 font-s-14">
						{{aadress.name}} &nbsp; {{aadress.tel}}
					</view>
					<view class="">
						{{aadress.address}}
					</view>
				</view>
			</view>
			<view class="" v-else>
				暂无默认地址去选择
			</view>
			<view class="font-s-18">
				>
			</view>
		</view>

		<orderList :list='list.goods'></orderList>


		<!-- 底部 -->
		<view class="order-bo bgc-low-gray ">
			<cc-coupon-cell @click='show = true' v-if='coupon.length' :coupons="coupon">
				<cc-popup height="1000" round :show.sync="show" mode="bottom">
					<cc-coupon-list :coupons="coupon" :disabled-coupons="disabledCoupons" @change='getoupons'>
					</cc-coupon-list>
				</cc-popup>
			</cc-coupon-cell>

			<view class="flex jce p-10">
				<text class="font-c-red">￥{{totals.toFixed(2)}}</text>
				<view class='m-lr-10'>
					<!-- #ifndef MP-WEIXIN -->
					<cc-button round type="error" @click='tozf'>提交订单</cc-button>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<cc-button round type="error" @click='submit'>提交订单</cc-button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<!-- 支付 -->

			<cc-password-input :value.sync="zfboo" @complete="handleComplete" ></cc-password-input>
	



	</view>

</template>

<script>
	import orderList from '../../components/order/orderList.vue'
	import dayjs from 'dayjs'
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
			orderList
		},
		props: {},
		data() {
			return {
				aadress: '',
				list: [],
				zfboo: false,
				show: false,
				totals: uni.getStorageSync('orderlist').total,
				disabledCoupons: [{
						available: 1,
						condition: '无使用门槛\n最多优惠12元',
						reason: '',
						value: 150,
						name: '优惠券名称',
						startAt: 1489104000,
						endAt: 1514592000,
						valueDesc: '1.5',
						unitDesc: '元',
						reason: '优惠券不可用描述信息'
					},
					{
						available: 1,
						condition: '无使用门槛\n最多优惠12元',
						reason: '',
						value: 150,
						name: '优惠券名称',
						startAt: 1489104000,
						endAt: 1514592000,
						valueDesc: '1.5',
						unitDesc: '元',
						reason: '优惠券不可用描述信息'
					}
				]
			}
		},
		methods: {
			...detailsActions(['addOrder', 'getCoupon', 'getAppAddress']),
			// 更换地址
			goadress() {
				uni.navigateTo({
					url: `../address/address?boo=${1}`
				})
			},
			// 更换优惠券
			getoupons(e) {
				this.totals = Number(uni.getStorageSync('orderlist').total) - Number(e.item.valueDesc)
			},
			// 支付
			tozf(){
				this.zfboo=true
			},
			// 输入密码正确
			handleComplete(val){
				if(val==='123456'){
					this.submit()
				}else{
					uni.showToast({
						title:'密码不正确',
						icon:'none'
					})
				}
			},
			// 提交
			submit() {
				this.addOrder({ // 用户id
					user_id: uni.getStorageSync('userId'),
					// 订单总价
					price: this.totals,
					// 用户地址
					address: this.aadress.address,
					// 订单商品数量
					count: this.list.count,
					// 支付时间
					pay_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
					// 商品列表
					goods_list: this.list.goods,
					// 用户电话
					mobile: this.aadress.tel,
				})
				uni.showToast({
					title:`结算成功，共计${this.totals}`
				})
				setTimeout(()=>{
					uni.switchTab({
						url: '../my/my'
					})
				},1000)
				
			},

		},
		mounted() {

		},
		onLoad(e) {
			let a = Number(e.boo)
			if (a) {
				this.aadress = uni.getStorageSync('DefaultAddress')
			} else {
				this.getAppAddress(uni.getStorageSync('userId'))
			}
		},
		onShow() {
			this.getCoupon()
			this.list = uni.getStorageSync('orderlist')
		},

		filters: {},
		computed: {
			...detailsState(['coupon', 'defaultAddress']),
		},
		watch: {
			// 设置默认值
			defaultAddress(val) {
				this.aadress = val
			},
			
		},
	}
</script>

<style scoped lang="scss">
	.order-bo {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 22;
	}
</style>
