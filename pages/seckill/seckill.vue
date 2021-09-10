<template>
	<view>
		<view class="p-lr-10 bgc-low-gray">
			<scroll-view scroll-x="true" :scroll-into-view="sklill" class=" " style="white-space: nowrap;">
				<view class="flex p-10">
					<view v-for="(item,index) in list" :id="'text'+index" :key="index"
						class="p-10 t-a-c font-s-14 bgc-white mr-10"
						:class="[{'isClick':index===isIngs},{'ising':index===isIng},{'end':index<isIngs}]"
						@click="goSeck(index)">
						<view class="">
							{{item.time}}
						</view>
						<view class="m-t-10  ">
							{{item.desc}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 商品列表 -->
		<view class="m-tb-10 p-10">
			<seckList v-if="seckillList" :seckillList='seckillList'></seckList>
		</view>


		<cc-toast ref="cToast"></cc-toast>

	</view>

</template>

<script>
	import dayjs from 'dayjs'
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

	import seckList from '../../components/seckill/seckillList.vue'
	export default {
		components: {
			seckList
		},
		props: {},
		data() {
			return {
				// 当前场次
				isIng: 1,
				timer: '',
				dsq: '',
				isIngs: -1,
				// 滚动位置
				sklill: 'text0',
				seckillList: '',
				list: [{
						time: '00: 00场',
						desc: '暂未开始'
					},
					{
						time: '08: 00场',
						desc: '暂未开始'
					}, {
						time: '10: 00场',
						desc: '暂未开始'
					}, {
						time: '12: 00场',
						desc: '暂未开始'
					}, {
						time: '14: 00场',
						desc: '暂未开始'
					}, {
						time: '16: 00场',
						desc: '暂未开始'
					}, {
						time: '18: 00场',
						desc: '暂未开始'
					}, {
						time: '20: 00场',
						desc: '暂未开始'
					}, {
						time: '22: 00场',
						desc: '暂未开始'
					}
				]
			}
		},
		methods: {
			...detailsActions(['getSeckill']),
			// 秒杀
			now() {
				//先获取当前的小时 确定场次
				let h = dayjs().hour()
				let ind = 0
				if (h >= 8) {
					ind = Math.floor((h - 8) / 2 + 1)
				}
				this.list[ind].desc = '抢购中'
				this.isIng = ind
				this.list.map((e, i) => {
					if (i > ind) {
						e.desc = '暂未开始'
					} else if (i < ind) {
						e.desc = '已结束'
					}
				})
				this.sklill = `text${ind}`
			},
			// 点击场次
			goSeck(e) {
				if (e < this.isIng) {
					this.$refs.cToast.show({
						title: '场次已结束,看看其他场次',
						type: 'info'
					})

				} else {
					this.isIngs = e
					this.sx2(e)
				}
			},
			// 可跨天可跨场
			sx2(e) {
				let num = 8 + (e - 1) * 2
				this.seckillList = this.seckill.filter(i => {
					// 当前时间在结束时间之前 说明秒杀没有结束
					if (dayjs(new Date).isBefore(dayjs(i.end_time))) {
						// 如果是当天结束 就判断场次 判断结束时间 就可以跨场 判断开始时间就不能跨场
						if (new Date().toDateString() === new Date(i.end_time).toDateString()) {
							let cc = dayjs(i.end_time).hour()					
							if (e) {
								if (cc > num) {
									return i
								}
							} else {
								// 0点场
								if (cc >= 0 && cc < 2) {
									return i
								}
							}
						} else {
							if (dayjs(i.start_time).valueOf()<=dayjs().valueOf()) {
								// 不是当天但在今天之后结束 并且已经开始了的
								return i
							}
						}
					}
				})

			},




			// 晒选秒杀数据 不跨天 不能跨场次
			sx(e) {
				let num = 8 + (e - 1) * 2
				this.seckillList = this.seckill.filter(i => {
					if (new Date().toDateString() === new Date(i.start_time).toDateString()) {
						// 判断场次 没有判断结束时间
						let cc = dayjs(i.start_time).hour()
						if (e) {
							if (cc >= num && cc < num + 2) {
								return i
							}
						} else {
							// 0点场
							if (cc >= 0 && cc < 2) {
								return i
							}
						}
					}
				})
			},

		},
		mounted() {
			this.sklill = 'text0'
			this.now()
			this.getSeckill()
			this.timer = setInterval(this.now, 1000)
		},
		onLoad() {

		},
		destroyed() {
			clearInterval(this.timer)
			this.timer = null
		},

		onShow() {

		},
		filters: {},
		computed: {
			...detailsState(['seckill']),

		},
		watch: {
			seckill(val) {
				this.sx2(this.isIng)
			}
		},
	}
</script>

<style scoped lang="scss">
	// 进行中
	.ising {
		background-color: #FC5531;
		color: #FFFFFF !important;
		border-radius: 10rpx;
	}

	.isClick {
		background-color: #ffaa00;
		color: #FFFFFF;
		border-radius: 10rpx;
	}

	//已结束
	.end {
		color: #555555;
	}
</style>
