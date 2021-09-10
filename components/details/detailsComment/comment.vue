<template>
	<view id='comment2'>
		<cc-cell isLink value="好评率90%" @click='goto'>
			<template #title>
				<text class="font-w-7">用户评价</text>
			</template>
		</cc-cell>
		
		<view class="p-10 bgc-white">
			<scroll-view scroll-x="true" style="white-space: nowrap;" v-if="goodData.comment&&goodData.comment.length">

				<view class="flex a-i-fs ">
					<view v-for="(item,index) in goodData.comment" :key="index" class="border p-10 mr-10 b-radius-10" v-if="item&&index<5">
						<view class="flex width-100 ">
							<image src="../../../static/avatar.76a75b8f17.png" mode='' style="width: 80rpx;height: 80rpx;" class="mr-5" v-if="item.isAnonymous"></image>
							<view class=""  v-else>
									<image :src="item.user.avatarUrl" v-if="item.user.avatarUrl" mode='' style="width: 80rpx;height: 80rpx;" class="mr-5"></image>
										<image src="../../../static/avatar.76a75b8f17.png" mode='' style="width: 80rpx;height: 80rpx;" class="mr-5"></image>
							</view>
						
							
							<view class="m-l-10">
								<view class="" v-if="item.isAnonymous">
									匿名用户
								</view>
								<view class="" v-else>{{item.user.username}}</view>
								<view class="font-s-12 font-c-gray m-t-5">{{item.comment_time}}</view>
							</view>
						</view>
						<view class="ellipsis-2  font-s-12 m-t-10" style="width: 60vw;white-space: pre-wrap;">
							{{item.content}}
						</view>
						<view class="flex  width-100 m-t-10" style="height:155rpx ;">
							<view v-for="(i,index) in item.pic" :key="index"  class="width-30  mr-10" v-if="index<4">
									<image :src="i" mode=""  class="width-100" style="height: 150rpx;"></image>
							</view>
						
						</view>
					</view>
				</view>
			</scroll-view>
		
		<view class="t-a-c m-tb-10" v-else>
			暂无评论
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
		props: {},
		data() {
			return {}
		},
		methods: {
			goto(){
				uni.navigateTo({
					url:'/pages/goodComment/goodComment'
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
			...detailsState(['goodData'])
		},
		watch: {
		},
	}
</script>

<style scoped lang="scss">

</style>
