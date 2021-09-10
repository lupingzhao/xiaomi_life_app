<template>
	<view class="orders">
		<view v-for="(item,index) in list" :key="index" class="p-10 bgc-low-gray width-90 m-c m-tb-10 b-radius-10">
			<view class="flex a-i-fs width-100">
				<view class="">
					<image :src="item.goods.cover" mode="" style="width: 200rpx;height: 200rpx;"></image>
				</view>
				<view class="m-l-10 width-100">
					<view class="font-s-14">
						{{item.goods.name}}
					</view>		
					<view class="flex m-tb-10 font-s-12" v-if="item.spec.length">
						<view v-for="(item1,index) in item.spec" :key="index">
							{{item1}}<text v-if="index<item.spec.length-1">/</text>
						</view>
					</view>
					<view class="font-s-12 font-c-gray mb-10 m-tb-10">
						售价：￥{{item.goods.presentPrice}}x{{item.count}}
					</view>
					<!-- 步进器 -->			
					<view class=" flex jcsb m-t-5">
						<view class="text-color">
							￥{{item.goods.presentPrice*item.count}}
						</view>						
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list:{
				type:Array
			}
		},
		data() {
			return {
				
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
		computed: {},
		watch: {
			
		},
	}
</script>

<style scoped lang="scss">
.orders{
	padding-bottom: 200rpx;
}
</style>
