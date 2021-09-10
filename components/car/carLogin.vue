<template>
	<view class="p-10">
		<!-- 全部 -->
		<view class="flex jcsb  bgc-white p-10 to-box">
			<view class="text-color">
				总价：￥{{totalPrice}}
			</view>
			<view class="flex">
				<cc-checkbox @change="all" :checked.sync="check1" :option="item1"></cc-checkbox>
				<text class="m-l-10"></text>
				<cc-button type="warning" @click='toorder'>去结算111{{sectlist.length}}</cc-button>
			</view>
		</view>

		<checkbox-group @change="checkboxChange" class=" width-100">
			<view class="mb-10 bgc-white b-radius-10 p-10 flex" v-for="(item,index) in carData" :key='index'>
				<checkbox :value="item._id" :checked="item.checked" color="#FF750D" style="transform:scale(0.7);" />
				<!-- 商品信息 -->
				<view class="flex a-i-fs width-100">
					<view class=" " @click="go(item.goods._id)">
						<image :src="item.goods.cover" mode="" style="width: 200rpx;height: 200rpx;"></image>
					</view>
					<view class="m-l-10 width-100">
						<view class="font-s-14">
							{{item.goods.name}}
						</view>

						<view class="flex m-tb-10 font-s-12" v-if="item.spec.length">
							<view v-for="(item1,index) in item.spec" :key="index">
								{{item1}}<text v-if="index<item.spec.length-1">/</text>
							</view>
						</view>
						<view class="font-s-12 font-c-gray m-tb-10">
							售价：￥{{item.goods.presentPrice}}
						</view>
						<!-- 步进器 -->
						<view class="">
							<cc-stepper :value.sync="item.count " @change='update(item.count,item._id)'></cc-stepper>
						</view>
						<view class=" flex jcsb m-t-5">
							<view class="text-color">
								￥{{item.goods.presentPrice*item.count}}
							</view>
							<view class="" @click="del(item._id)">
								<image src="../../static/hs.png" class="s-img" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>

		<cc-toast ref="cToast"></cc-toast>


		<!-- 删除 -->
		<cc-dialog :show.sync="isdel" showCancelButton title="删除商品" content="将该商品从购物车删除？" @confirm='delgood'>
		</cc-dialog>


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
				isdel: false,
				delid: '',
				sectlist: [],
				count: 0,
				item1: {
					label: '全选',
					size: '20',
					checkedColor: '#ee0a24'
				},
				check1: false,
			}
		},
		methods: {
			...detailsActions(['updateCart', 'delCart']),
			// 去详情
			go(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
			},
			//多选框组 
			checkboxChange(e) {
				this.sectlist = []
				e.detail.value.map(e => {
					this.carData.map(i => {
						if (i._id === e) {
							i.checked = true
							return this.sectlist.push(i)
						}
					})
				})
				if (this.sectlist.length === this.carData.length) {
					this.check1 = true
				} else {
					this.check1 = false
				}

			},
			// 全选
			all(e) {
				this.carData.map(i => {
					i.checked = e
				})
				if (e) {
					this.sectlist = this.carData
				} else {
					this.sectlist = []
				}
			},
			// 删除商品
			delgood() {
				this.delCart({
						del: {
							// 用户id
							user_id: uni.getStorageSync('liftUser')._id,
							// 商品id
							id: this.delid
						},
						update: uni.getStorageSync('userId')
					}),
					this.delid = ''
			},
			del(id) {
				this.delid = id
				this.isdel = true
			},
			// 修改购物车 步进器事件
			update(count, id) {
				this.updateCart({
					// 商品id
					id: id,
					// 用户id
					user_id: uni.getStorageSync('liftUser')._id,
					// 商品数量
					count: count,
				})

			},
			// 去结算
			toorder() {
				if (this.sectlist.length > 0) {
					uni.navigateTo({
						url: `../../pages/order/order?boo=${0}`
					})
					let list = {
						goods: this.sectlist,
						total: Number(this.totalPrice),
						count: this.count
					}
					uni.setStorageSync('orderlist', list)
				} else {
					this.$refs.cToast.show({
						title: '没有选中商品',
						type: 'warning'
					})
				}
			}

		},
		mounted() {


		},
		onLoad() {

		},
		onUnload() {
			this.totalPrice = 0.00
		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(['carData']),
			totalPrice() {
				this.count = 0
				let sum = 0.00
				this.sectlist.map(i => {
					this.count += i.count
					sum += i.count * i.goods.presentPrice
				})
				return sum.toFixed(2)
			},

		},
		watch: {
			
		},
	}
</script>

<style scoped lang="scss">
	.to-box {
		position: fixed;
		bottom: 0;
		/* #ifndef MP-WEIXIN */
		bottom: 90rpx;
		/* #endif */

		left: 0;
		right: 0;
		z-index: 99999;
	}
</style>
