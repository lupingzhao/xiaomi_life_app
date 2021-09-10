<template>
	<view>
		<cc-sticky :offsetTop="offsetTop">
			<view class="mb-10">
				<cc-search :value.sync="value" placeholder="请输入城市名称或拼音查询" :showAction="false" round></cc-search>
			</view>
		</cc-sticky>

		<!-- 非搜索 -->
		<view class="p-10" v-if="!value && cityList.length">
			<cc-index-bar :indexList='indexList'>
				<view v-for="(item,k) in cityList" :key="k">
					<cc-index-anchor :index="item.py_head" class="m-tb-10"></cc-index-anchor>
					<view v-for="(i,index1) in item.name_list" :key="index1" class="p-tb-10"
						@click="switchAdress(i.id,i.name)">
						{{i.name}}
					</view>

				</view>
			</cc-index-bar>
		</view>


		<!-- 搜索 -->
		<view class="p-10" v-else>
			<view v-if="areaList.length>0" v-for="(item,index) in areaList" :key="index" class="p-10"
				@click="switchAdress(item.id.item.name)">
				{{item.name}}
			</view>
			<view class="t-a-c m-tb-10" v-if="areaList.length===0"> 暂无该城市</view>
		</view>


	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let myModeule = createNamespacedHelpers('my')
	// 解构模块化里的数据与请求方法
	let {
		mapState: myState,
		mapActions: myActions
	} = myModeule

	export default {
		components: {

		},
		props: {},
		data() {
			return {
				citys: [],
				indexList: [],
				// #ifdef H5
				offsetTop: 85,
				// #endif		
				// #ifdef MP-WEIXIN
				offsetTop: 0,
				// #endif
				value: '',
			}
		},
		methods: {
			...myActions(['getAreaList', 'searchAreaList']),
			// 选择地址
			switchAdress(id, name) {
				// h5
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: `../../myMap/myMap?area_id=${id}&area_name=${name}`,
				})
				// #endif

				// 微信
				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url:`../../myMap/wxMap/map?area_id=${id}&area_name=${name}`
				})
				// #endif

			},

			// 获取城市列表
			getCity() {
				this.getAreaList()
			}
		},
		mounted() {
			this.getCity()

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['cityList', 'areaList']),
		},
		watch: {
			value(e) {
				this.searchAreaList(e)
			},
			// #ifdef H5
			cityList(i) {
				i.map(c => {
					this.indexList.push(c.py_head)
				})
			}
			// #endif

		},
	}
</script>

<style scoped lang="scss">

</style>
