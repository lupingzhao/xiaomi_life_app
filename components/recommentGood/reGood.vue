<template>
	<view class="p-t-10 font-s-14 bgc-white recommend">
		<!-- 推荐商品 -->
		<cc-tabs @change="change" :current="current" :list="list" >
			
			<swiper :indicator-dots="true" :autoplay="true" indicator-active-color="#e0A60A"  class="re-box"	:current="current1" @change='change1'>	
				<swiper-item v-for="(item,index) in 3" :key='index' class="m-t-10" >		
					<view class=" flex flex-wrap"  >
						<view class="width-30 name " v-if="index1>=current1*6 &&index1<(current1+1)*6" v-for="(item1,index1) in goodsData" :key='index1'
							@click.stop="go(item1._id)">
							<view class="">
								<image :src="item1.cover" mode="" class="img"></image>
							</view>
							<view class="p-5 ellipsis-2" style='height: 80rpx;'>
								{{item1.name}}
							</view>
							<view class=" p-5 mb-10">
								<text class="font-w-7 text-color mr-5">￥{{item1.presentPrice }}</text>
								<text class="del-line font-c-gray">￥{{item1.originalPrice}}</text>
							</view>
						</view>
					</view>
			
				</swiper-item>
			
			</swiper>

		</cc-tabs>
		<view class="t-a-c m-tb-10" v-if="goodsData.length===0">
			暂无推荐商品
		</view>
	</view>

</template>

<script>
	
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: [{
						title: '为你推荐'
					}, {
						title: '爆款推荐'
					},

				],
				current: 0,
				current1:0
			}
		},
		methods: {
			// 标签栏切换
			change(e) {
				this.current = e
				!e?this.$store.dispatch('getRecommend'): this.$store.dispatch('getHot')
			},
			// 轮播去切换
			change1(e){
				this.current1=e.detail.current
			},
			// 去详情
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
.recommend {
		.re-box {
			height: 800rpx;
			margin-bottom: 20rpx;
		}

		.img {
			width: 100%;
			height: 200rpx;
		}

		.color {
			color: #BBA68A;
			border-bottom: 2rpx solid #BBA68A;
			width: fit-content;
			padding-bottom: 15rpx;
		}

		.name {
			height: 380rpx;
			// margin:auto;
			margin: 0 calc(10%/6);
		}
	}
</style>
