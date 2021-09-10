<template>
	<view>
		<scroll-view scroll-y="true" @scrolltolower="scroll" style="height: 100vh;">
			<view style="padding-bottom: 200rpx;">

				<view v-for="(item,index) in searchLists" :key="index" class="p-10 bor-b" @click="go(item._id)">
					<view class="flex a-i-fs width-90 m-c">
						<view class="width-30">
							<image :src="item.cover" mode="" class="width-100" style="height: 250rpx;"></image>
						</view>
						<view class="width-70 m-l-10">
							<view class="font-s-14">
								{{item.introduction}}
							</view>
							<view class="font-s-12 font-c-gray m-t-10">
								<view v-for="item in item.sellDesc" :key="item.id">
									{{ item }}
								</view>
							</view>
							<view class="font-c-red m-tb-10">
								<text class="font-s-12">￥</text> <text class="font-s-16 ">{{item.presentPrice}}</text>
							</view>
							<view class="font-c-gray font-s-12 m-tb-10">
								6368条评价99.4%满意
							</view>
						</view>
					</view>
				</view>
				<view class="t-a-c m-tb-10 font-s-12" v-if="searchLists.length===seachTotal">
					————没有更多————
				</view>
				<view class="t-a-c m-tb-10 font-s-12" v-if="searchLists.length<seachTotal">
					————下滑加载更多————
				</view>


			</view>

		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			searchLists: {
				type: Array,
				required: true
			},
			seachTotal:{
				type:Number,
			}
		},
		data() {
			return {}
		},
		methods: {
			go(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
			},
			// scroll
			scroll() {
				this.$emit('bottom')
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
