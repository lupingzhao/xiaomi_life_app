<template>
	<view class="bgc-white">
		<view class="m-tb-10">
			<cc-cell isLink style="background-color: #FFF3EB;">
				<template #title>
					<image src="../../../static/paihang.png" mode="" style="width: 200rpx;height: 40rpx;"></image>
				</template>
			</cc-cell>
		</view>


		<view class="font-s-12" v-if="goodData.spec && goodData.spec&&goodData.spec.length">
			<cc-cell isLink @click='slect'>
				<template #title>
					<view class="ellipsis" style="width: 75vw;">
						<text class="custom-title">已选:</text>
						<text class="font-s-12">{{goodData.name}}</text>
						<text class="ellipsis font-s-12" v-for="(i,index) in goodData.spec" :key='index'>
							{{i.checklist[0]}}
							<text class="jgf" v-if="index<goodData.spec.length-1">x</text>
						</text>
					</view>

				</template>
			</cc-cell>
		</view>

		<view class="">
			<cc-cell isLink @click='dw'>
				<template #title>
					<view class="ellipsis" style="width: 75vw;">
						<text class="custom-title mr-10">送至:</text>
						<text>{{addrss}}</text>
					</view>
				</template>
				
			</cc-cell>
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
				addrss: '定位中...'
			}
		},
		methods: {
			slect() {
				this.$emit('open', 'select')
			},
			// 定位
			dw() {
				this.addrss='定位中...'
				this.$utils.getLocation().then(res => {
					// #ifdef H5
					this.addrss = res.data.formattedAddress
					// #endif
					// #ifdef MP-WEIXIN
					this.addrss = res.data[0].regeocodeData.formatted_address
					// #endif
				}).catch(err => {
					this.addrss = '定位失败'
				})
			}
		},
		mounted() {
			this.dw()

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
	.jgf {
		margin: 0 10rpx;
	}
</style>
