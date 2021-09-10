<template>
	<view class="login">
		<!-- 手机号登录 -->
		<view class="">
			<view class=" flex phone m-c b-radius-10 p-10 m-t-10" :class="isred?'isred':'nored'">
				<view class="mr-10 font-w-7">
					{{codeC}} &nbsp;>
				</view>
				<view class="pos-rel">
					<input type="number" v-model="phone" placeholder="请输入手机号" :maxlength="11" />
					<view class="ts font-c-red pos-ab m-tb-10 p-tb-5 font-s-12 ">
						{{errmessg}}
					</view>
				</view>
			</view>

			<view class="m-tb-10 t-a-r pr-10 " style="color: #007AFF;">
				<view class="mr-10 font-s-12 t-a-r" @click="getcodes" :class="isget?'isget':'font-c-gray'">
					{{codemsg}}
				</view>
			</view>

			<!-- 验证码 -->
			<view class=" flex phone m-c b-radius-10  p-10 " style="margin-bottom: 40rpx;">
				<view class="mr-10 font-w-7">
					验证码 &nbsp;
				</view>
				<view class="pos-rel">
					<input type="number" v-model="code" placeholder="请输入验证码" :maxlength="11" />
				</view>
			</view>
			<view class="m-tb-10 flex jcc width-100">
				<cc-button type="primary" :disabled="dis" @click="submit" class="">登录</cc-button>
			</view>
		</view>



	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let loginModeule = createNamespacedHelpers('login')
	// 解构模块化里的数据与请求方法
	let {
		mapState: loginState,
		mapActions: loginActions
	} = loginModeule


	export default {
		components: {},
		props: {},
		data() {
			return {
				codeC: '+86',
				code: '',
				phone: '',
				isred: false,
				dis: true,
				errmessg: '',
				codemsg: '获取验证码',
				isget: true,
				isiphone: false
			}
		},
		methods: {
			...loginActions(['getCode', 'register', 'mobileLogin']),
			submit() {
				this.mobileLogin({
					mobile: this.phone,
					code: this.code
				})
			},
			timers() {
				let time = 5
				// 开启定时器
				let timer = setInterval(() => {
					time--
					this.codemsg = `${time}s后重新发送`
					if (time === 0) {
						clearInterval(timer)
						this.isget = true
						this.codemsg = '重新发送'
						time = 5
					}
				}, 1000)

			},
			// 获取验证码
			getcodes() {
				if (this.isget && this.phone && this.errmessg) {
					this.isget = false
					// 开启定时器
					this.timers()
					this.getCode({
						mobile: this.phone
					})
				} else {
					if (!this.errmessg) {
						uni.showToast({
							title: '请输入正确手机号',
							icon: 'none'
						})
					}
				}
			},
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			phone(val) {
				val ? this.isred = true : this.isred = false
				if (val.length > 6) {
					this.dis = false
				} else {
					this.dis = true
				}
				let a = /^(?:(?:\+|00)86)?1\d{10}$/
				if (a.test(this.phone)) {
					this.errmessg = ''
					this.isiphone = true
				} else {
					this.isiphone = false
					this.errmessg = '请输入正确的手机号'
				}
				this.isiphone && this.code ? this.dis = false : this.dis = true
			},
			code(val) {
				val && this.isiphone ? this.dis = false : this.dis = true
			}
		},
	}
</script>

<style scoped lang="scss">
	.phone {
		background-color: #f5f5f5;
		width: 80vw;
	}

	.isred {
		border: 1rpx solid #FF750D;
	}

	.nored {
		border: 1rpx solid transparent;
	}

	.isget {
		color: #007AFF;
	}
</style>
