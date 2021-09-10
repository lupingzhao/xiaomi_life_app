<template>
	<view class=" login ">
		<view class="flex p-10 jcsb">
			<view class="flex p-t-10" @click="islang">
				选择语言
				<image src="../../static/bottom.png" class="m-l-10" style="width: 30rpx;height: 30rpx;" mode=""></image>
			</view>
			<view class="p-t-10">
				<image src="../../static/my1/dp.png" class="s-img m-r-25" mode=""></image>
				<image src="../../static/my1/yw.png" class="s-img m-r-25" mode=""></image>
			</view>
		</view>

		<view class="flex jcc m-tb-25">
			<view class="t-a-c">
				<image src="../../static/login/mi.png" mode="" class="m-c" style="width: 140rpx;height: 140rpx;">
				</image>
				<view class="m-tb-10">
					让每个人都能享受科技的乐趣
				</view>
			</view>
		</view>
		
		
		<view class="m-tb-10 p-10" >
			<view class="font-s-18 font-w-7 pl-10 " style="margin-bottom: 30rpx;">
				小米账号登录
			</view>
			<!-- 手机号 -->
			<loginType v-if="type"></loginType>
			<!-- 用户名 -->
			<userLogin v-else></userLogin>
		</view>

		<!-- 底部 -->
		<view class="m-tb-25 t-a-c">
			<view class="font-c-gray font-s-12">
				<text @click="qhTypep" v-if="type">用户名密码登录</text>
				<text @click="qhTypeu" v-else>手机号登录</text>
				<text class="m-lr-10">|</text>
				<text @click="register">立即注册</text>
			</view>
			<view class="font-c-gray font-s-12 m-tb-10">
				<text>————</text>
				<text class="m-lr-10">其他方式登录</text>
				<text>————</text>
			</view>

			<view class="flex jcsb width-70 m-c">
				<view v-for="(item,index) in icon" :key="index">
					<image :src="item" mode="" class="m-img"></image>
				</view>
			</view>
		</view>



		<!-- 动作面板选语言 -->
		<cc-action-sheet :list="list" :show.sync="show" @select='select'></cc-action-sheet>
	</view>

</template>

<script>
	import loginType from '../../components/loginView/loginType.vue'
	import userLogin from '../../components/loginView/userLogin.vue'
	export default {
		components: {
			loginType,
			userLogin
		},
		props: {},
		data() {
			return {
				show: false,
				type: true,
				list: [{
						name: '简体中文'
					},
					{
						name: '繁體中文'
					},
					{
						name: 'English'
					}
				],
				icon: [
					'../../static/login/QQ.png', '../../static/login/wb.png',
					'../../static/login/zfb.png', '../../static/login/wx.png',
					'../../static/login/pg.png'
				]
			}
		},
		methods: {
			// 打开语言切换
			islang() {
				this.show = true
			},
			// 点击语言
			select(item) {
				// console.log(item.item);
				uni.showToast({
					title: item.item.name,
					icon: 'none'
				})
			},
			// 注册
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			// 切换登录
			qhTypep() {
				this.type = false
			},
			qhTypeu() {
				this.type = true
			}

		},
		mounted() {

		},
		onLoad() {

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
