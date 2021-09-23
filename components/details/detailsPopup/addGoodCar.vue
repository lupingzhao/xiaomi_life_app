<template>
	<view class="">
		<view class="button-box b bgc-white p-10" @click.stop>
			<scroll-view scroll-y="true" style="height: 62vh;">
				<view class="width-100">
					<view class="width-100">
						<view class="p-5 t-a-r ">
							<image src="../../../static/image/icon_close.png" class="s-img" mode="" @click="colse">
							</image>
						</view>

						<!-- 商品信息 -->
						<view class="flex a-i-fs width-100" style="margin-top: -20rpx;">
							<image :src='goodData.cover' class="ml-25" style="width: 20%; height: 180rpx;" mode="">
							</image>
							<view class="m-l-10 width-100">
								<view class="text-color">
									￥{{goodData.presentPrice}}
								</view>
								<view class="m-t-10 width-100">
									<view class="font-s-12">{{goodData.name}}</view>
									<view class="font-s-12 m-t-10">
										已选中：
									</view>
									<view class=" width-100 ellipsis-2">
										<text class=" font-s-12" v-for="(i,index) in speccheck" :key='index'>
											{{i}}
											<text class="jgf" v-if="index<speccheck.length-1">x</text>
										</text>
									</view>

								</view>
							</view>
						</view>

						<!-- 规格 -->
						<view class="">
							<view v-for="(item,index) in goodData.spec" :key="index" class="m-tb-10">
								<view class=" font-w-7" style="margin: 30rpx 0;">
									{{item.name}}
								</view>
								<view class="flex flex-wrap">
									<view :class="{'selectindex':selcindex[index]===index1}"
										@click="checked(index,index1,item1)" v-for="(item1,index1) in item.checklist"
										class="specitem" :key="index1">
										{{item1}}
									</view>
								</view>
							</view>
						</view>
						<view class="flex jcsb " @click.stop style="margin: 30rpx 0;">
							<view class="font-w-7">
								购买数量
							</view>
							<cc-stepper decimalLength="0" :value.sync="value"></cc-stepper>
						</view>

					</view>
				</view>
			</scroll-view>

			<view class="bgc-low-gray">
				<view class="flex jcc" v-if="istype==='select'">
					<view class="flex jcc  width-90">
						<view class="car flex-1 " @click="addcar">
							加入购物车
						</view>
						<view class="buy flex-1 " @click="tobuy">
							立即购买
						</view>
					</view>
				</view>
				<view class="flex" v-else>
					<view class="car1 " @click="addcar">
						确定
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
	let detailsModeule = createNamespacedHelpers('goods')
	// 解构模块化里的数据与请求方法
	let {
		mapState: detailsState,
		mapActions: detailsActions
	} = detailsModeule

	export default {
		components: {},
		props: {
			istype: {
				type: String
			},
			checklist: {
				type: Array
			},
			checkindex: {
				type: Array
			}
		},
		data() {
			return {
				value: 1,
				speccheck: this.checklist,
				selcindex: this.checkindex,
			}
		},
		methods: {
			...detailsActions(['addCart', 'getCart']),
			// 关闭弹出层
			colse() {
				this.$emit('colse')
			},
			// 选择规格
			checked(i1, i2, item) {
				this.selcindex.splice(i1, 1, i2)
				this.speccheck.splice(i1, 1, item)
			},
			// 立即购买
			tobuy() {
				uni.showToast({
					title: '立即购买',
					icon: 'none'
				})
			},
			// 加入购物车
			addcar() {
				if (this.istype !== 'buy') {
					this.addCart({
						add: {
							// 用户id
							user_id: uni.getStorageSync('liftUser')._id,
							// 购物车数量
							count: this.value,
							// 商品
							goods: this.goodData,
							// 商品规格
							spec: this.speccheck
						},
						update: uni.getStorageSync('liftUser')._id
					})
				} else {
					this.tobuy()
				}
				this.colse()
			},


		},
		mounted() {
			// console.log(this.istype)

		},
		onLoad() {

		},
		onShow() {
			this.goodsDetail()
		},
		filters: {},
		computed: {
			...detailsState(['goodData'])
		},
		watch: {

		}
	}
</script>

<style scoped lang="scss">
	.button-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
		height: 70vh;
	}

	.jgf {
		margin: 0 10rpx;
	}

	.selectindex {
		background-color: #FFF2EF !important;
		border: 1rpx solid #FF8C73 !important;
	}

	.specitem {
		padding: 12rpx 25rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		margin-right: 15rpx;
		font-size: 12px;
		border: 1rpx solid transparent;
	}

	.car {
		width: 50%;
		text-align: center;
		padding: 20rpx;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		background-image: linear-gradient(to right, #FFD916, #FF940E);
	}

	.car1 {
		width: 90%;
		text-align: center;
		padding: 20rpx;
		background-color: #FF940E;
		border-radius: 30rpx;
		text-align: center;
		margin: 5rpx auto;
	}

	.buy {
		width: 50%;
		text-align: center;
		padding: 20rpx;
		border-top-right-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		background-image: linear-gradient(to right, #FF532B, #FF0A1C);
	}



	.b {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
