<template>
  <view>
   <view class="m-t-10">
   	<view class=" flex phone m-c b-radius-10 p-10 m-t-10" :class="isred?'isred':'nored'">
   		<view class="mr-10 font-w-7">
   		用户名：
   		</view>
   		<view class="pos-rel">
   			<input  v-model="user.username" placeholder="请输入用户名" :maxlength="11" />
   		</view>
   	</view>

   	
   	<!-- 验证码 -->
   	<view class=" flex phone m-c b-radius-10  p-10 m-t-10"  style="margin-bottom: 40rpx;">
   		<view class="mr-10 font-w-7">
   			密码 ：
   		</view>
   		<view class="pos-rel">
   			<input v-model="user.password" type="password" placeholder="请输入密码"  />
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
				isred: false,
				user:{
					username:'',
					password:""
				},
				dis:true		
			}
    },
    methods: {
			...loginActions(['userLogin']),
			submit(){
				this.userLogin(this.user)
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
    watch: {
			user:{
				handler(val){
					if(val.username!=='' && val.password!==''){
						this.dis=false
					}else{
						this.dis=true
					}
				},
				deep:true
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
