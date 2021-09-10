<template>
	<view>
		<view class="t-a-c m-tb-10" v-if="seckillList.length===0">
			暂无秒杀商品
		</view>

		<view v-for="(item,index) in seckillList" :key="index" class="flex mb-10 bor-b p-5 a-i-fs font-s-14">
			<view class="width-30">
				<image :src="item.goods.cover" mode="" class="width-100 m-c" style="height: 200rpx;"></image>
			</view>
			<view class="m-l-10 width-100">
				<view class="">
					{{item.goods.name}}
				</view>
				<view class="m-t-5 font-c-red">
					秒杀价：￥{{item.price}}
					<text class="m-l-5 font-c-gray font-s-12 del-line">原价￥{{item.goods.presentPrice}}</text>
				</view>
				<view class="m-t-5">
					秒杀数量： {{item.goods_number}}
				</view>
				<view class="m-t-10 ">
					<view class="" v-if="progess[index]===0">暂未开始</view>
					<view class="" v-else-if="progess[index]==100">已结束</view>
					<view class="" v-else>
						<cc-progress class="width-90" v-if='progess.length' :percentage="Number(progess[index])"
							bg-color="#f46"></cc-progress>
					</view>
				</view>
				<view class="t-a-r m-t-5">
					<cc-tag type="error">立即购买</cc-tag>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {
			seckillList: {
				type: Array
			}
		},
		data() {
			return {
				progess: [],
				dsq: '',
				c:null
			}
		},
		methods: {
			// 动态倒计时
			a() {
				this.progess = []
				this.seckillList.map(i => {
					this.progess.push(this.$utils.countdown(i.start_time, i.end_time))
				})
			}

		},
		mounted() {
			this.seckillList.map(i => {
				this.progess.push(1)
			})
			this.a()
			this.dsq = setInterval(this.a, 1000)
		},
		onLoad() {

		},
		// 组件销毁
		destroyed(){
			clearInterval(this.dsq)
			this.dsq=null
		},
		onShow() {

		},
		filters: {},
		computed: {
			// 进度条 没有使用
			// progess3() {
			// 	this.c=setInterval(()=>{
			// 		return this.seckillList.map(i => {
			// 			// 当前时间
			// 			let now = dayjs().valueOf()
			// 			if (now >= dayjs(i.start_time)) {
			// 				let a1 = now - dayjs(i.start_time).valueOf()
			// 				let a2 = dayjs(i.end_time).valueOf() - dayjs(i.start_time).valueOf()
			// 				let cut = (a1 / a2 * 100).toFixed(2)
			// 				if (cut >= 100) {
			// 					return 100
			// 				} else {
			// 					return cut
			// 				}
			// 			} else {
			// 				return 0
			// 			}
			// 		})
			// 	},1000)
				
			// }
		},
		watch: {

		},
	}
</script>

<style scoped lang="scss">

</style>
