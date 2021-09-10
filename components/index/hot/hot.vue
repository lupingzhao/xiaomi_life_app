<template>
	<view class="bgc-white m-tb-10 p-lr-10">
		<view class="p-10">
			人气新品
		</view>
		<view class="flex">
			<view v-if="index<=2" v-for="(item,index) in newGoods" :key="index" :class="index===0?'width-48':'width-25'"
				class="m-tb-10" @click="goto(item._id)">
				<view class="width-100">
					<image :src="item.cover" mode="" class="width-100" style="height: 250rpx;"></image>
				</view>
				<view class="t-a-c font-s-12">
					{{item.name}}
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
	let indexModeule = createNamespacedHelpers('home')
	// 解构模块化里的数据与请求方法
	let {
		mapState: indexState,
		mapActions: indexActions
	} = indexModeule

	export default {
		components: {},
		props: {},
		data() {
			return {}
		},
		methods: {
			goto(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
				
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			// 解构模块化中的数据
			...indexState(['newGoods'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
