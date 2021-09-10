<template>
	<view class="cate ">
		<!-- #ifndef MP-WEIXIN -->
		<view class="flex p-10 indexhead bgc-low-gray">
			<view class="bgc-white flex m-l-15 b-radius-10 width-80 p-5" @click="gotoseach">
				<view class="m-l-10 flex">
					<image src="../../static/sousuo.png" mode="" class="seachimg"></image>
				</view>
				<view class="font-c-gray ml-25 ">
					搜索商品
				</view>
			</view>
		</view>
		<!-- #endif -->
		<view class="flex a-i-fs jcsb about-side">
			<view class=" ">
				<cc-sidebar v-if="cateData" :list="cateData" @change="change">
				</cc-sidebar>
			</view>
			<view class="">
				<cateContent v-if="cateData" :list='cateData[index].list'></cateContent>
			</view>
		</view>


	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let cateModeule = createNamespacedHelpers('category')
	// 解构模块化里的数据与请求方法
	let {
		mapState: cateState,
		mapActions: cateActions
	} = cateModeule

	import cateContent from '../../components/category/CateContent.vue'

	export default {
		components: {
			cateContent
		},
		props: {},
		data() {
			return {
				index: 0
			}
		},
		methods: {
			...cateActions(['getCategory']),
			// 侧边栏切换
			change(item) {
				this.index = item.index
			}
		},
		mounted() {
			this.getCategory()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...cateState(['cateData']),
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.cate {
		.seachimg {
			width: 40rpx;
			height: 40rpx;
		}


		.sidebox {
			background-color: #F7F8FA;
		}
	}
</style>
