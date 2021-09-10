<template>
	<view class="p-10 bgc-white m-t-5">
		<!-- 价格 -->
		<view class="flex a-i-fe">
			<view class="text-color font-s-16 font-w-7">
				￥{{goodData.presentPrice}}
			</view>
			<view class="font-s-12 m-l-5 font-c-gray del-line">
				￥{{goodData.originalPrice}}
			</view>
		</view>
		<!-- 商品名字 -->
		<view class="m-tb-10 font-w-7">
			{{goodData.name}}
		</view>
		<!-- 介绍 -->
		<view class="font-s-12 mb-10">
			{{goodData.introduction}}
		</view>
		<!-- 推荐介绍 -->
		<view class="font-s-12 ">
			<view v-for="(item,index) in goodData.sellDesc" :key="index" class="flex m-t-5">
				<view class="mr-5 flex">
					<image :src="descicon[index]" mode="" class="s-img"></image>
				</view>
				<view class="">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 参数 -->
			 <scroll-view scroll-x="true" class="m-t-10 font-s-12 bor-t">
			 	<view class="flex " style="white-space: nowrap;">
			 		<view v-for="(item,index) in goodData.params" :key="index" class="t-a-c p-10 "
			 			@click="swhichReNav(item._id,index)">
			 			<view class="">
			 				<image :src="item.url" mode="" class="s-img"></image>
			 			</view>
			 			<view class="" style='white-space: nowrap;'>
			 				{{item.name}}
			 			</view>
			 			<view class="ellipsis t-a-c " style="width: 100rpx; " >
			 				{{item.desc}}
			 			</view>
			 		</view>
			 	</view>
			 </scroll-view>
		 	
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
			return {
				descicon: ['../../static/1.png', '../../static/2.png', '../../static/3.png']
			}
		},
		methods: {},
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
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
