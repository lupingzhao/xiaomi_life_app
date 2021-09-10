<template>
	<view>
		<cc-sticky>
			<cc-nav-bar background="#f5f5f5" @clickLeft='goback'>
				<!-- #ifndef MP-WEIXIN -->
				<template #left>
					<image src="../../static/icon/icon-back2.2d09ed8aaf.png" mode="" class="m-img"></image>
				</template>
				<!-- #endif -->

				<template #default>
					<cc-field :value.sync="value" :border="false" clearable style="width: 70vw;" @change="handleInput"
						placeholder="请输入搜索商品">
					</cc-field>
				</template>
				<template #right>
					<image src="../../static/sousuo.png" mode="" class="m-img m-l-10" @click="handleInput"></image>
				</template>
			</cc-nav-bar>

			<!-- 导航 -->
			<view class="pos-rel " style="margin-top: -1rpx;">
				<view class="flex jcsa bgc-low-gray  p-10">
					<view class="flex " :class="{'text-color':index1===0}" @click="click(0)">
						<text>全部</text>
						<view class="flex m-l-5 font-s-12">
							▼
						</view>
					</view>
					<view class="" @click="click(1)" :class="{'text-color':index1===1}">
						销量
					</view>
					<view class="flex" @click="click(2)" :class="{'text-color':index1===2}">
						价格
						<view class="flex">
							<image src='../../static/up.png' mode="" class="s-img" v-if="index2===1"></image>
							<image src='../../static/down.png' mode="" class="s-img" v-if="index2===0"></image>
							<image src='../../static/sort.png' mode="" class="s-img" v-if="index2===-1"></image>
						</view>
					</view>
					<view class="flex" @click="click(3)" :class="{'text-color':index1===3}">
						筛选
					</view>

				</view>
				<view class="pos-ab width-100 font-s-12 bgc-white" v-if="isqb">
					<view class="flex  jcsb p-10 bor-b" @click="qusx(0)" :class="{'text-color':index===0}">
						<view class="">
							综合排序
						</view>
						<view class="">
							√
						</view>
					</view>
					<view class="flex  jcsb p-10 bor-b" @click="qusx(1)" :class="{'text-color':index===1}">
						<view class="">
							新品优先
						</view>
						<view class="">
							√
						</view>
					</view>
				</view>
			</view>

		</cc-sticky>

		<cc-popup :show.sync="isSx" mode="right">
			<view class="flex p-10">测试页面</view>
		</cc-popup>
		<!-- 筛选弹出层 -->
		<!-- <view class="popu-sx " @click="colse" v-if="isSx">
			<view class="bgc-white width-70 " @click.stop>
				<scroll-view scroll-y="true" class="bgc-white">
					<view class="p-10">
						测试页
					</view>
				</scroll-view>
			</view>
		</view> -->
		
		
		<!-- 内容 -->
		<view class="" v-if="searchLists.length===0">
			<view class="">
				<image src="../../static/no.png" mode="" class="width-100"></image>
			</view>
			<recommendList></recommendList>
		</view>

		<!-- 搜索结果 -->

		<view class="" v-else>
			<goodsList v-if="searchList" :searchLists='searchLists' :seachTotal='seachTotal' @bottom='bottom'>
			</goodsList>
		</view>



	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let seachModeule = createNamespacedHelpers('seach')
	// 解构模块化里的数据与请求方法
	let {
		mapState: seachState,
		mapActions: seachActions
	} = seachModeule

	import recommendList from '../../components/recommentGood/recommendList.vue'
	import goodsList from '../../components/seachGoods/goodsList.vue'
	export default {
		components: {
			recommendList,
			goodsList
		},
		props: {},
		data() {
			return {
				value: '',
				// 全部下拉
				index: 0,
				// 导航
				index1: 0,
				// 价格
				index2: -1,
				sum: 0,
				sum1: 0,
				isSx: false,
				isqb: false,
				// 页数、
				current: 1,
				pageSize: 10,
				// 接收数据
				searchLists: []
			}
		},
		methods: {
			...seachActions(['search']),
			goback() {
				uni.navigateBack()
			},
			// 搜索
			handleInput() {
				this.search({
					current: 1,
					pageSize: 10,
					query: this.value
				})
				if (this.value) {
					this.$utils.saveHistory({
						key: 'search',
						data: this.value,
					})
				}
			},
			// 切换导航
			click(e) {
				if (e === 0) {
					this.sum1++
					if (this.sum1 % 2 === 0) {
						this.isqb = false
					} else(
						this.isqb = true
					)
					this.index2 = -1
					this.sum = 0
				} else if (e === 1) {
					this.index2 = -1
					this.sum = 0
					this.sum1 = 0
				} else if (e === 2) {
					if (this.sum % 2 === 0) {
						this.index2 = 0
					} else(
						this.index2 = 1
					)
					this.sum++
					this.sum1 = 0
					console.log(this.index2);
				} else if (e === 3) {
					this.index2 = -1
					this.sum = 0
					this.sum1 = 0
					this.isSx = true
					this.isqb = false
				}
				// console.log(e);
				this.index1 = e
			},
			// 关闭筛选弹框
			colse() {
				this.isSx = false
			},
			// 全部下的筛选
			qusx(e) {
				this.index = e
				this.isqb = false
				this.sum1 = 0
			},
			// 触底
			bottom() {
				if (this.searchLists.length < this.seachTotal) {
					this.current++
					this.search({
						current: this.current,
						pageSize: this.pageSize,
						query: this.value
					})
				} else return

			}
		},
		mounted() {

		},
		onLoad(e) {
			this.value = e.value
			this.search({
				current: this.current,
				pageSize: this.pageSize,
				query: e.value
			})

		},
		onShow() {

		},
		filters: {},
		computed: {
			...seachState(['searchList', 'seachTotal'])
		},
		watch: {
			searchList(val) {
				this.searchLists = this.searchLists.concat(val)
			}
		},
	}
</script>

<style scoped lang="scss">
	.popu-sx {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: flex-end;
		z-index: 999999;

		.box-1 {
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}
</style>
