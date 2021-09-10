<template>
	<view class="p-10 ">
		<view class="flex jcc m-tb-10">
			<view class="x-line"></view>
			<view class="m-lr-10"> 商品推荐</view>
			<view class="x-line"></view>
		</view>
		
		
		<view class="flex flex-wrap jcsb font-s-12">
			<view v-for="(item,index) in goodsData" :key="index" class="width-48" @click.stop="go(item._id)">
				<view class="">
					<image :src="item.cover" mode="" class="width-100" style="height: 350rpx;"></image>
				</view>
				<view class="width-100 ellipsis m-tb-10">
					{{item.name}}
				</view>
				<view class="mb-10">
					<text class="font-w-7 text-color mr-5">{{item.presentPrice}}</text>
					<text class="del-line font-c-gray">￥{{item.originalPrice}}</text>
				</view>
			</view>
		</view>
		
		
	</view>


</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {}
		},
		methods: {
			// 去详情
			go(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
			},
			go(id){
			uni.navigateTo({
				url:`/pages/details/details?id=${id}`
			})
			}
		},
		mounted() {
			this.$store.dispatch('getRecommend')
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			goodsData(val) {
				return this.$store.state.regood
			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.x-line {
		width: 100rpx;
		height: 6rpx;
		background-color: #000000;
	}
</style>
