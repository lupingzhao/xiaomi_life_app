<template>
	<view>
		<!-- 历史记录 -->
		<view class="flex jcsb m-tb-10 p-10 font-s-14" v-if="histroy">
			<view class='font-w-7'>
				搜索历史
			</view>
			<view class="">
				<image src='../../static/hs.png' @click="delhis" class="s-img" mode=""></image>
			</view>
		</view>
		<view class="flex flex-wrap m-tb-10 p-lr-10">
			<view v-for="(item,index) in histroy" :key="index" class="his-item b-radius-10 mb-10" @click="toseach(item)">
				{{item}}
			</view>
		</view>

		<!-- 搜索发现 -->
		<view class="flex jcsb m-tb-10 p-10 font-s-14 p-t-10" style="margin-top: 30rpx;">
			<view class='font-w-7'>
				搜索发现
			</view>
		</view>
		<view class="flex jcsb flex-wrap m-tb-10 p-lr-10">
			<view @click="toseach(item.name)" v-for="(item,index) in saechData" :key="index" class="hot font-s-12 b-radius-10 width-48">
				{{item.name}}
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let seachModeule = createNamespacedHelpers('seach')
	// 解构模块化里的数据与请求方法
	let {
		mapState: seachState,
		mapActions: seachActions
	} = seachModeule

	export default {
		components: {},
		props: {
			value: {
				type: String
			}
		},
		data() {
			return {
				histroy: ''
			}
		},
		methods: {
			...seachActions(['getSearchWords', 'search']),
			delhis(){
				this.$utils.delhistory('search')
				this.histroy=''
				// this.$store.commit('')
			},
			// 搜搜
			toseach(e){		
					uni.navigateTo({
						url:`/pages/seachGoods/goodsList?value=${e}`
					})
					this.$utils.saveHistory({
						key: 'search',
						data: e,
					})				
			},
			
		},
		mounted() {
			
		},
		onLoad() {

		},
		onShow() {
this.histroy = this.$utils.getHistory('search')
		},
		filters: {},
		computed: {
			...seachState(['saechData']),

		},
		watch: {
			value: {
				handler(val) {
					!val?this.histroy = this.$utils.getHistory('search'):''
				},
				immediate: true
			}
		},
	}
</script>

<style scoped lang="scss">
	.his-item {
		padding: 20rpx;
		font-size: 12px;
		background-color: #f5f5f5;
		margin-right: 15rpx;

	}

	.hot {
		margin: 20rpx 0;
	}
</style>
