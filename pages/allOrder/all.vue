<template>
	<view>
		<cc-tabs @change="change" :current="current" :list="list" class="font-s-16">
			<view v-if="current === 1" class="t-a-c p-10">暂无数据</view>
			<!-- 订单 -->
			<view v-if="current === 0 " class="p-10">
				<view v-if="!all.length" class="t-a-c m-tb-10">
					暂无数据
				</view>
				<view v-else v-for="(item,index) in all" :key="index"
					class="border width-90 b-radius-10 p-10 m-tb-10 font-s-14">
					<view class="flex jcsb">
						<view class="font-s-14">{{item.pay_time}}</view>
						<view class="">
							<image src="../../static/hs.png" class="s-img" mode=""
								@click="todel(item.id,item.user_id,index)"></image>
						</view>
					</view>
					<view v-for="(i,index1) in item.goods_list" :key="index1" class="m-tb-10 flex a-i-fs">
						<view class="width-30">
							<image :src="i.goods.cover" mode="" class="width-100" style="height: 240rpx;"></image>
						</view>
						<view class="width-70 m-l-10 ">
							<view class="flex jcsb">
								<view class="">
									{{i.goods.name}}
								</view>
								<view class="font-c-red">
									￥{{i.count*i.goods.presentPrice}}
								</view>
							</view>
							<view class="m-tb-10">
								<text class="font-c-red mr-5">￥{{i.goods.presentPrice}} </text> X{{i.count}}
							</view>
							<view class="flex" v-if="i.spec">
								<view v-for="(e,index) in i.spec" :key="index">
									{{e}};
								</view>
							</view>
							<view class="m-t-5 font-c-red t-a-r" @click="toeve(item.id,item.user_id,i.goods,i._id)">
								去评价
							</view>
						</view>

					</view>

					<view class="t-a-r">
						<view class="font-s-12">收货地址：{{item.address}}</view>
						<view class="font-s-12 m-tb-10">电话：{{item.mobile}}</view>
						<view class="font-s-12 font-c-red mb-10">总价：￥{{item.price}}</view>
					</view>

				</view>
			</view>
		</cc-tabs>


		<cc-dialog :show.sync="isdel" showCancelButton title="删除" content="删除该订单？" @confirm='del'></cc-dialog>


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
		components: {},
		props: {},
		data() {
			return {
				current: 0,
				isdel: false,
				delid: '',
				deluid: '',
				list: [{
						title: '全部订单'
					},
					{
						title: '待付款'
					},
				]
			}
		},
		methods: {
			...myActions(['getAppOrder', 'delOrder']),
			// 导航栏切换
			change(e) {
				this.current = e
			},
			todel(id, uid, index) {
				this.isdel = true
				this.delid = id
				this.deluid = uid
			},
			//删除订单
			del(id, uid, index) {
				this.all.splice(index, 1)
				this.delOrder({
					// 订单id
					orderId: this.delid,
					// 用户id
					user_id: this.deluid,
				})
			},
			// 去评价
			toeve(id, uid, goods,gid) {
				let info = {
					id: id,
					uid: uid,
					gid:gid,
					good: goods
				}
				uni.setStorageSync('eveInfo',info)
				uni.navigateTo({
					url: `../my/evaluate/evaluate`
				})
			}
		},
		mounted() {
			this.getAppOrder(uni.getStorageSync('userId'))
		},
		onLoad(e) {
			this.current = Number(e.index)
		},
		onShow() {

		},
		filters: {},
		computed: {
			...myState(['all'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
