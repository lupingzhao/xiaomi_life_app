<template>
	<view class="bgc-low-gray">
		<cc-sticky :offset-top="0">
			<index-head :istop='istop'></index-head>
			<!-- h5推荐导航 -->
			<!-- #ifndef MP-WEIXIN -->
			<view class=" bgc-low-gray nav-box ">
				<view class="flex jcsb p-lr-10" v-if="iconindex===0">

					<scroll-view scroll-x="true" style="white-space: nowrap;">
						<view class=" flex jcsa width-90">
							<view v-for="(item,index) in reNav" :key="index" class="mr-10 p-5 slect_box "
								:class="{'slectBox':slectindex===index}" @click="swhichReNav(item._id,index)">
								{{item.name}}
							</view>
						</view>
					</scroll-view>
					<view class='' @click="arrow(1)">
						<image :src='icon[iconindex]' mode="" style="width: 30rpx; height: 30rpx;"></image>
					</view>
				</view>


				<view class="p-10 " v-else>
					<view class="flex jcsb">
						<view class="">
							全部
						</view>
						<view class="" @click="arrow(0)">
							<image :src='icon[iconindex]' mode="" style="width: 30rpx; height: 30rpx;"></image>
						</view>
					</view>
					<view class="flex flex-wrap m-tb-10 arrow-box bgc-low-gray p-10">
						<view v-for="(item,index) in reNav" :key="index" class="mr-10  p-5 slect_box"
							:class="{'slectBox':slectindex===index}" @click="swhichReNav(item._id,index)">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
		</cc-sticky>

		<cc-notice-bar v-if='isNotice' volume closeable bgColor='#FF5B2A' speed="40" color='#fff' @click="clickBar"
			@clickLeft="clickLeft" @clickRight="clickRight">
			<template>
				<view class="flex">
					<view v-for="(item,index) in notice" class="ml-25" :key='index'>
						{{index+1}}、{{item.content}}
					</view>
				</view>
			</template>
		</cc-notice-bar>

		<wxbanner></wxbanner>

		<hot></hot>

		<cc-sticky :offset-top="140">
			<!--小程序推荐导航  -->
			<!-- #ifdef MP-WEIXIN -->
			<scroll-view scroll-x="true" class="bgc-low-gray t-a-c wx-re">
				<view class="flex " style="white-space: nowrap;">
					<view v-for="(item,index) in reNav" :key="index" class="t-a-c p-10"
						@click="swhichReNav(item._id,index)">
						<view class="font-s-14">
							{{item.name}}
						</view>
						<view class="t-a-c font-s-12 m-t-5 p-5 " :class="{'renavactive':slectindex===index}">
							{{item.desc}}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- #endif -->
		</cc-sticky>

		<!-- 商品 -->
		<reGoods ref="regood"></reGoods>



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


	import indexHead from '../../components/index/indexHead.vue'
	import wxbanner from '../../components/index/wx-index/banner.vue'
	import hot from '../../components/index/hot/hot.vue'
	import reGoods from '../../components/index/reGoods/reGoods.vue'

	export default {
		components: {
			indexHead,
			wxbanner,
			hot,
			reGoods
		},
		props: {},
		data() {
			return {
				icon: ['../../static/bottom.png', '../../static/top.png'],
				iconindex: 0,
				slectindex: 0,
				istop: true,
				isNotice: true
			}
		},
		methods: {
			// 模块中的方法序列化
			...indexActions(['getRecommendNav', 'getNew', 'getNavGoods', 'getNotice']),
			// 推荐导航
			arrow(e) {
				this.iconindex = e
			},
			// 切换推荐导航栏
			swhichReNav(id, index) {
				this.getNavGoods(id)
				this.slectindex = index
				// 子组件的方法 回到顶部
				this.$refs.regood.goTop()
			},
			// 通知右侧
			clickRight() {
				this.isNotice = false
			}
		},
		mounted() {
			this.getRecommendNav()
			this.getNew()
			this.getNotice()


		},
		// 滚动到底部
		onReachBottom(e) {
			// uni.showToast({
			// 	title:'到底了',
			// 	icon:'none'
			// })
		},
		// 自带方法/
		onPageScroll(e) {
			// #ifdef MP-WEIXIN
			if (e.scrollTop > 10) {
				this.istop = false
			} else {
				this.istop = true
			}
			// this.scrollTop = e.scrollTop;
			// #endif
			
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			// 解构模块化中的数据
			...indexState(['reNav', 'notice'])
		},
		watch: {
			reNav(val) {
				this.getNavGoods(val[0]._id)
			}
		},
	}
</script>

<style scoped lang="scss">
	.nav-box {
		position: relative;

		.arrow-box {
			position: absolute;
			z-index: 99;
			left: 0;
			right: 0;
		}

		.slectBox {
			border-bottom: 8rpx red solid !important;
		}

		.slect_box {
			border-bottom: 8rpx solid transparent;
		}
	}

	.wx-re {
		.renavactive {
			background-color: #FF5934;
			color: #FFFFFF;
			border-radius: 15rpx;
		}
	}
</style>
