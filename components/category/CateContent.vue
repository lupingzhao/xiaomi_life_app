<template>
	<view class=" catecontent ">

		<view class="" v-if="list.length>0" class="width-100">
			<view class="flex jcc  m-tb-10">
				<image src="../../static/af31685c81d8958069c17b1e40ea2d78.jpg" mode="" style="width:90% ;height: 160rpx;"></image>
			</view>
			<view class="m-tb-10 p-10">
				<scroll-view scroll-x="true" style="flex-wrap: nowrap;white-space: nowrap;width: 70vw;">
					<view class="flex  p-lr-10">
						<view v-for="(item,index) in list" :key="index" class="p-5 mr-10 bgc-low-gray b-radius-5 "
							@click="goto(item.name,index)">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>

			<scroll-view scroll-y="true" :scroll-into-view='scrollname' class="m-tb-10" style="height: 75vh;">
				<view v-for="(item,index) in list" :key="index" :id='"text"+index' class="width-100">
					<view class="font-s-16 font-w-7 m-tb-10">
						{{item.name}}
					</view>
					<view class="width-100 m-t-10" v-if="item.list">
						<view class="width-100" v-for="(item1,index) in item.list" :key="index">
							<view v-for="(value,key,index1) in item1" :key="index" class="">
								<view v-for="(item2,index2) in value" :key="index2" class="flex mb-10 a-i-fs bgc-low-gray width-90 t-a-l b-radius-10 p-10"
									@click="go(item2._id)">
									<view class="width-30">
										<image :src='item2.cover' mode="" class="width-100" style="height: 200rpx;">
										</image>
									</view>
									<view class="m-l-10 width-70 p-5 font-s-14">
										{{item2.name}}
									</view>
								</view>


							</view>
						</view>
					</view>
					<view class=" t-a-c width-100" v-else style="height: 80rpx;">
						暂无数据
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="t-a-c p-10 " v-else style="width: 70vw;transform: translateY(40vh);">
			暂无数据
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array,
				required: true,
				default: []
			}
		},
		data() {
			return {
				scrollname: '',
			}
		},
		methods: {
			// 滚动指定位置 锚点功能
			goto(e, index) {
				// console.log(e)
				this.scrollname = 'text' + index
				// this.scrollname = '' //不清空再次跳到锚点位置会不起作用
			},
			go(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
			}
		},
		mounted() {
			// console.log(this.list)
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
	.catecontent {}
</style>
