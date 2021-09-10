<template>
  <view class="flex p-10 indexhead " :class="{'bgc-o':!istop}" >
    <view class="headimg" v-if="istop">
    	<image src="../../static/logo.png" mode="" class=""></image>
    </view>
	<view class="bgc-white flex m-l-15 b-radius-10 "  :class="istop?'seach':'seach1'" @click="gotoseach">
		<view class="m-l-10 flex">
		<image src="../../static/sousuo.png" mode="" class="seachimg"></image>
		</view>
		<view class="font-c-gray ml-25">
			搜索商品
		</view>
	</view>
	<!-- #ifndef MP-WEIXIN -->
	<view class="" @click="goto">
		<image src="../../static/icon-user.png" mode="" class="s-img"></image>
	</view>
	<!-- #endif -->	
  </view>

</template>

<script>
  export default {
    components: {
		
	},
    props: {
		istop:{
			type:Boolean
		}
	},
    data() {
      return {}
    },
    methods: {
		// 去首页
		gotoseach(){
			uni.navigateTo({
				url:'../../pages/seach/seachView'
			})
		},
		goto(){
			uni.switchTab({
				url:'../../pages/my/my'
			})
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
.bgc-o{
	background-color: #f5f5f5 !important;
}
.indexhead{
	
	/* #ifdef MP-WEIXIN */
	padding-top: 50rpx;
	
	background-color: #FF6900;
	.headimg{
		background-color: #FFFFFF;
		padding: 10rpx;
		border-radius: 10rpx;
		image{		
			width: 40rpx;
			height: 40rpx;
		}	
	}
	.seach{
		width: 60%;
		height: 70rpx;
	}
	.seach1{
		width: 70%;
		height: 70rpx;
	}
	
	/* #endif */
	
	
	/* #ifndef MP-WEIXIN */
	background-color: #f5f5f5;
	justify-content: space-between;
	.seach{
		width: 70%;
		height: 70rpx;
	}
	
	.headimg{
		image{
			width: 60rpx;
			height: 60rpx;
		}	
	}
	/* #endif */
	.seachimg{
		width: 40rpx;
		height: 40rpx;
	}
	.s-img{
		width: 60rpx;
		height: 60rpx;
	}
}
</style>
