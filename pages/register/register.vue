<template>
	<view class="p-10">
		<view class="flex p-10 jcsb">
			<view class="flex p-t-10">
			</view>

			<view class="p-t-10">
				<image src="../../static/login/dq.png" class="s-img m-r-25" mode="" @click="islang"></image>
				<image src="../../static/my1/dp.png" class="s-img m-r-25" mode=""></image>
				<image src="../../static/my1/yw.png" class="s-img m-r-25" mode=""></image>
			</view>
		</view>

		<view class="font-s-18 font-w-7">
			注册小米帐号
		</view>
		<view class="m-t-5  font-s-12" style="color: #007AFF;">
			系统会根据您选择的国家/地区的法律法规存储您的个人信息
		</view>

		<!-- 表单 -->
		<view class=" flex phone m-c m-tb-10 p-10 " style="margin-top: 60rpx;margin-bottom: 40rpx;"
			:class="isred?'isred':'nored'">
			<view class="mr-10 font-w-7">
				用户名：
			</view>
			<view class="pos-rel">
				<input v-model="regis.username" placeholder="请输入用户名" />
				<view class="ts font-c-red pos-ab m-tb-10 p-tb-5 font-s-12 ">
					{{errmessg}}
				</view>
			</view>
		</view>
		<view class=" flex phone m-c mb-10 b-radius-10 p-10 " style="margin-bottom: 40rpx;"
			:class="isred?'isred':'nored'">
			<view class="mr-10 font-w-7">
				密码：
			</view>
			<view class="pos-rel ">
				<input type="password" v-model="regis.password" placeholder="请输入密码" />
				<view class="ts font-c-red pos-ab m-tb-10 p-tb-5 font-s-12 ">
					{{errmessg}}
				</view>
			</view>
		</view>

		<view class=" flex phone m-c b-radius-10 p-10 mb-10 " style="margin-bottom: 50rpx;"
			:class="ismobile?'mobile':'nored'">
			<view class="mr-10 font-w-7">
				{{codeC}} &nbsp;>
			</view>
			<view class="pos-rel">
				<input type="number" v-model="regis.mobile" placeholder="请输入手机号" :maxlength="11" />
				<view class="ts font-c-red pos-ab m-tb-10 p-tb-5 font-s-12 ">
					{{ismobilemsg}}
				</view>
			</view>
		</view>

		<!--  -->
		<view class=" flex phone m-c b-radius-10 p-10 " style="margin-bottom: 40rpx;">
			<view class="pos-rel">
				<input type="number" v-model="regis.code" placeholder="请输入验证码" />
				<view class="ts font-c-red pos-ab m-tb-10 p-tb-5 font-s-12 ">
				</view>
			</view>
			<view class="mr-10 font-w-7 t-a-r" @click="getcodes" :class="isget?'isget':'font-c-gray'">
				{{codemsg}}
			</view>
		</view>
		<view class="m-tb-10 flex jcc width-100 rebtn ">
			<cc-button type="primary" :disabled="dis" @click="submit" class=" width-90 ">注册</cc-button>
		</view>

		<view class="flex jcc" style="margin-top: 50rpx;">
			<view class="">
				<cc-checkbox @change="handleChange" :checked.sync="check1" :option="item1"></cc-checkbox>
			</view>
			<view class="">
				已阅读并同意小米帐号<text class="" style="color: #007AFF;">用户协议</text>和<text style="color: #007AFF;">隐私政策</text>
			</view>
		</view>


		<!-- 动作面板选语言 -->
		<cc-action-sheet v-if="list1" :list="list1" :show.sync="show" @select='select'></cc-action-sheet>

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
				codemsg: '获取验证码',
				regis: {
					mobile: '',
					code: '',
					username: "",
					password: ''
				},
				item1: {
					label: '',
					size: '15'
				},
				issq:false,
				check1: false,
				isred: false,
				ismobile: false,
				dis: true,
				isget: true,
				isphone:false,
				errmessg: '',
				ismobilemsg: '',
				show: false,
				list1: [{
						name: '简体中文'
					},
					{
						name: '繁體中文'
					},
					{
						name: 'English'
					}
				],
			}
		},
		methods: {
			...loginActions(['getCode', 'register']),
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
			// 授权
			handleChange(e) {
				// console.log(e);
				this.issq=e
			},
			timers() {
				let time = 30
				// 开启定时器
				let timer = setInterval(() => {
					time--
					this.codemsg = `${time}s后重新发送`
					if (time === 0) {
						clearInterval(timer)
						this.isget = true
						this.codemsg = '重新发送'
						time = 30
					}
				}, 1000)

			},
			// 获取验证码
			getcodes() {
				//是否是可点击状态
				if (this.isget) {
					// 手机号验证是否通过
					if(this.isphone){
						this.isget = false
						// 开启定时器
						this.timers()
						this.getCode({
							mobile: this.regis.mobile
						})
					}	else this.ismobilemsg='请输入正确的手机号'			
				} else {
					return 
				}
			},
			// 注册
			submit() {
				if(this.issq){
					this.register(this.regis)
				}else{
					uni.showToast({
						title:'未勾选授权须知',
						icon:'none'
					})
				}
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...loginState([])
		},
		watch: {
			regis: {
				handler(val) {
					if (val.mobile) {
						let a = /^(?:(?:\+|00)86)?1\d{10}$/
						if (a.test(val.mobile)) {
							this.ismobilemsg = ''
							this.isphone=true
						} else {
							this.isphone=false
							this.ismobilemsg = '请输入正确的手机号'
						}
					}
					if (val.mobile !== '' && val.code !== '' && val.username !== '' && val.password !== '') {
						this.dis = false
					} else {
						this.dis = true
					}

				},
				deep: true
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
