<template>
	<view class="details">
		<scroll-view scroll-y="true" class=" bgc-low-gray" :scroll-into-view='scrollname'>
			<!-- 顶部 -->

			<view class="flex  pos-ab nav-box" :class="istop?'bgc-white':''">
				<view class="flex">
					<image v-if='!istop' @click="back" src="../../static/icon/icon-back3.cee4a42398.png" class="m-img"
						mode=""></image>
					<image v-else @click="back" src="../../static/icon/icon-back2.2d09ed8aaf.png" class="m-img" mode="">
					</image>
				</view>
				<view class="flex ">
					<view v-for="(item,index) in topnav" :key="index" v-if="istop" class="t-a-c p-10 m-t-5"
						:class="index===active?'text-color':''" @click="gotoscroll(item,index)">
						{{item}}
						<view class=" m-c m-t-5" :class="index===active?'act-b-line':'b-line'"></view>
					</view>
				</view>

				<view class="">
					<!-- #ifndef MP-WEIXIN -->
					<image v-if='!istop' src="../../static/icon/icon-share-white.10afb8d45d.png" class="m-img" mode="">
					</image>
					<image v-else src="../../static/icon/icon-share-black.faaff0b7f0.png" class="m-img" mode="">
					</image>
					<!-- #endif -->
				</view>
			</view>

			<!-- 轮播图 -->

			<view id='goods1'>
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 50vh;">
					<swiper-item v-for="(item,index) in goodData.pic" :key='index' class="width-100">
						<image :src="item" mode="" class="width-100 height-100"></image>
					</swiper-item>

				</swiper>

				<!-- 商品信息 -->
				<goodsinfo></goodsinfo>
				<goodsCell @open='ckecklogin'></goodsCell>
			</view>

			<!-- 评价 -->
			<view class="">
				<comment id="comment2"></comment>
			</view>
			<!-- 推荐商品 -->
			<reGood></reGood>
			<detailsFooter @open='ckecklogin'></detailsFooter>
			<!-- 详情 -->
			<detailsSpec></detailsSpec>

			<!-- 商品选择弹出层 -->
			<view class="pupo" v-if="ispopu" @click="colse">
				<addGoodCar v-if="istype" :istype="istype" @colse='colse' :checklist='checklist'
					:checkindex='checkindex'></addGoodCar>
			</view>



		</scroll-view>

	</view>

</template>

<script>
	import goodsinfo from '../../components/details/goodsinfo.vue'
	import detailsFooter from '../../components/details/detailsFooter/detailsFooter.vue'
	import goodsCell from '../../components/details/goodsCell/goodsCell.vue'
	import comment from '../../components/details/detailsComment/comment.vue'
	import reGood from '../../components/recommentGood/reGood.vue'
	import detailsSpec from '../../components/details/detailsSpec/detailsSpec.vue'
	import addGoodCar from '../../components/details/detailsPopup/addGoodCar.vue'
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
			goodsinfo,
			detailsFooter,
			goodsCell,
			comment,
			reGood,
			detailsSpec,
			addGoodCar
		},
		props: {},
		data() {
			return {
				istop: false,
				topnav: ['商品', '评价', '详情', '推荐'],
				scrollname: "goods",
				active: 0,
				ispopu: false,
				istype: '',
				checklist: [],
				checkindex: []
			}
		},
		methods: {
			...detailsActions(['goodsDetail', 'getCart']),
			// 去到页面某个位置
			gotoscroll(e, index) {
				this.active = index
			},
			// 返回
			back() {
				uni.navigateBack()
			},
			// 弹出层
			open(e) {
				this.istype = e
				this.ispopu = true
			},
			ckecklogin(e) {
				this.$utils.checkLogin({
					key: 'liftUser',
					next: this.open,
					item: e
				})
			},
			// 关闭弹出层
			colse() {
				this.ispopu = false
			}
		},
		// 滚动到底部
		onReachBottom(e) {
			uni.showToast({
				title: '到底了',
				icon: 'none'
			})
		},
		onPageScroll(e) {
			if (e.scrollTop > 20) {
				this.istop = true
			} else {
				this.istop = false
			}
			// console.log(e.scrollTop)
		},
		mounted() {

		},
		onLoad(e) {
			this.goodsDetail(e.id)
		},
		onShow() {
			if (uni.getStorageSync('liftUser')) {
				this.getCart(uni.getStorageSync('userId'))
			}
		},
		filters: {},
		computed: {
			...detailsState(['goodData'])
		},
		watch: {
			goodData(val) {
				if (val.spec) {
					val.spec.map((i, index) => {
						this.checkindex.push(0)
						this.checklist.push(i.checklist[0])
					})
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.details {


		padding-bottom: 120rpx;

		.pupo {
			background-color: rgba(0, 0, 0, 0.8);
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 99999999;
		}

		.nav-box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			padding: 8rpx;
			z-index: 99999;
			/* #ifdef MP-WEIXIN */
			padding-top: 30rpx;
			/* #endif */
			/* #ifndef MP-WEIXIN */
			justify-content: space-between;

			/* #endif */
			.m-img {
				width: 80rpx;
				height: 80rpx;
			}

			.b-line {
				background-color: transparent;
				height: 8rpx;
				width: 20rpx;
			}

			.act-b-line {
				background-color: #FF750D;
				height: 8rpx;
				width: 45rpx;
			}
		}

	}
</style>
