<template>
	<view class="seach">
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
				<view class="flex jcc m-l-10 p-5">
					<image src="../../static/sousuo.png" mode="" class="m-img" @click="handleInput"></image>
				</view>
			</template>

		</cc-nav-bar>

		<view class="p-t-10 font-s-14" v-if="value">
			<view class="pos-ab ts-box">
				<view v-for="(item,index) in searchList" :key="index" class="hot bor-b p-10 bgc-white ">
					{{item.name}}
				</view>
			</view>
		</view>





		<seachContent :value='value'></seachContent>



	</view>

</template>

<script>
	import seachContent from '../../components/seachview/seachContent.vue'

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


	export default {
		components: {
			seachContent
		},
		props: {},
		data() {
			return {
				value: ''
			}
		},
		methods: {
			goback() {
				uni.navigateBack()
			},
			...seachActions(['getSearchWords', 'search']),
			// 搜索
			handleInput() {
				uni.navigateTo({
					url: `/pages/seachGoods/goodsList?value=${this.value}`
				})
				if (this.value) {
					this.$utils.saveHistory({
						key: 'search',
						data: this.value,
					})

				}
			},

		},

		mounted() {
			// app里的方法
			// console.log(global.isLogin());
			this.getSearchWords()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...seachState(['saechData', 'searchList'])
		},
		watch: {
			value(val) {
				this.search({
					current: 1,
					pageSize: 10,
					query: val
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.seach {
		.ts-box {
			position: absolute;
			top: 80rpx;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.6) !important;
			z-index: 9999;
		}
	}
</style>
