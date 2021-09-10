<template>
	<view class="p-10" v-if="info">
		<view class="flex p-10 a-i-fs">
			<view class="">
				<image :src="info.good.cover" mode="" style="width: 30vw;height: 200rpx;"></image>
			</view>
			<view class="font-s-14 m-l-10">
				<view class="">{{info.good.name}}</view>
				<view class="font-s-14 font-c-red m-tb-10">￥{{info.good.presentPrice}}</view>
			</view>
		</view>

		<view class="m-tb-10 p-10 flex">
			<text class="mr-10">评分:</text>
			<cc-rate :value.sync="eva.rate"></cc-rate>
		</view>
		<view class="p-10 mb-10">
			<view class="">
				内容：
			</view>
			<cc-field :maxlength="200" show-word-limit :value.sync="eva.content" type="textarea" rows="3"></cc-field>
		</view>
		<view class="">
			<view class=""></view>
			<view class="">
				<cc-upload action="http://localhost:7001/app/upload" :header='header' @uplpadSuccess="uplpadSuccess"	@delete="delpic" >
				</cc-upload>
			</view>
		</view>

		<view class="m-tb-10 p-10">
			<view class="mb-10">
				是否匿名：
			</view>
			<view class="flex">
				<cc-switch :value.sync="eva.isAnonymous"></cc-switch>
			</view>
		</view>

		<view class="" style="margin-top: 25rpx;">
			<cc-button type="primary" block @click='sumbit'>提交评价</cc-button>
		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let myModeule = createNamespacedHelpers('my')
	// 解构模块化里的数据与请求方法
	let {
		mapState:myState,
		mapActions: myActions
	} = myModeule
	
	export default {
		components: {},
		props: {},
		data() {
			return {
				info: '',
				eva: {
					rate: 5,
					content: '',
					isAnonymous: false,
					pic: []
				},
				header: {
					Authorization: uni.getStorageSync('liftToken')
				}
			}
		},
		methods: {
			...myActions(['createComment']),

			// 上传图片
			uplpadSuccess(e){
				this.eva.pic.push(e.data.data)
			},
			// // 删除图片
			delpic(e){
				this.eva.pic.splice(e.index,1)
			},
			// 提交评价
			sumbit() {
				this.createComment({
					// 用户id
					user_id:this.info.uid,
					// 商品id
					goods_id:this.info.gid,
					// 订单id
					order_id:this.info.id,
					...this.eva,
					// 评论时间
					comment_time:dayjs().format('YYYY-MM-DD HH:mm:ss')
				})
				uni.navigateBack()
			}
		},
		mounted() {
			this.info = uni.getStorageSync('eveInfo')
		},
		onLoad(e) {


		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
