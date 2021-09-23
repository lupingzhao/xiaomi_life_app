<template>
	<scroll-view scroll-y="true" :scroll-top="scrollTop" @scroll="scroll" style="height: 80vh;">
		<view class="flex bgc-low-gray p-10 jcsb a-i-fs regoods">
			<view class="width-48 ">
				<view v-for="(item,index) in navGoods" :key="index" v-if="index%2===0"
					class="width-100 m-tb-10 pos-rel bgc-white b-radius-10" @click="goto(item._id)">
					<view class="p-5">
						<view class=" t-a-r p-5">
							<image src="../../../static/image/icon_close.png" mode="" class="s-img"
								@click.stop="open(index)">
							</image>
						</view>
						<view class="width-100 mb-10 m-t-5">
							<image :src="item.cover" mode="" style="width: 100%;height: 300rpx;" :lazy-load="true">
							</image>
						</view>
						<view class="mb-10 font-s-14">
							{{item.name}}
						</view>
						<view class=" font-c-red font-s-14">
							￥{{Number(item.presentPrice).toFixed(2)}}
						</view>
						<view class="font-c-gray del-line font-s-14">
							￥{{ Number(item.originalPrice).toFixed(2)}}
						</view>
						<view class="p-5">
							<view class="p-5 bgc-low-gray b-radius-10 m-t-5 font-s-12">
								{{item.introduction}}
							</view>
						</view>
					</view>
					<!-- 遮罩层 -->
					<view class=" mask-box font-c-w flex jcc " @click.stop="close" v-if="maskindex===index">
						<view class="width-80 ">
							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">不感兴趣</cc-button>
							</view>

							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">不喜欢</cc-button>
							</view>
							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">已经看过了</cc-button>
							</view>
							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">已购买</cc-button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 右侧 -->
			<view class="width-48">
				<view v-for="(item,index) in navGoods" :key="index" v-if="index%2!==0"
					class="width-100 m-tb-10 pos-rel bgc-white b-radius-10" @click="goto(item._id)">
					<view class="p-5">
						<view class=" t-a-r  p-5">
							<image src="../../../static/image/icon_close.png" mode="" class="s-img"
								@click.stop="open(index)">
							</image>
						</view>
						<view class="width-100 mb-10 m-t-5">
							<image :src="item.cover" mode="" :lazy-load="true" style="width: 100%;height: 300rpx;"></image>
						</view>
						<view class="mb-10 font-s-14">
							{{item.name}}
						</view>
						<view class=" font-c-red font-s-14">
							￥{{Number(item.presentPrice).toFixed(2)}}
						</view>
						<view class="font-c-gray del-line font-s-12">
							￥{{ Number(item.originalPrice).toFixed(2)}}
						</view>
						<view class="p-5">
							<view class="p-5 bgc-low-gray b-radius-10 m-t-5 font-s-12">
								{{item.introduction}}
							</view>
						</view>

					</view>
					<!-- 遮罩层 -->
					<view class=" mask-box font-c-w flex jcc " @click.stop="close" v-if="maskindex===index">
						<view class="width-80 ">
							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">不感兴趣</cc-button>
							</view>

							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">不喜欢</cc-button>
							</view>
							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">已经看过了</cc-button>
							</view>
							<view class="width-100" @click.stop='butn(index)'>
								<cc-button round :customStyle="{'margin': '15rpx 0','width': '100%'}">已购买</cc-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>

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
		props: {
			
		},
		data() {
			return {
				maskindex: null,
				oldScrollTop: 0,
				scrollTop: 0,
			}
		},
		methods: {
			// 去详情
			goto(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
				// console.log(id)
			},
			// 关闭遮罩层
			close() {
				this.maskindex = null
			},
			//打开遮罩层
			open(e) {
				console.log(e)
				this.maskindex = e
			},
			// 按钮点击事件
			butn(e) {
				this.navGoods.splice(e, 1)
				this.maskindex = null
			},
			// 滚动事件
			scroll(e) {
				//记录scroll  位置
				this.oldScrollTop = e.detail.scrollTop
			},
			goTop(e) {
				//视图会发生重新渲染
				this.scrollTop = this.oldScrollTop
				//当视图渲染结束 重新设置为0
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				
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
			...indexState(['navGoods'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.regoods {
		.mask-box {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.7);
		}
	}
</style>
