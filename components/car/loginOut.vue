<template>
  <view>
		<!-- 未登录状态 -->
   <view class="t-a-c p-10 bgc-low-gray" style="height: 300rpx;">
   	<view class="m-tb-25">
   		暂未登录
   	</view>
		<view class="" @click="go">
			登录获取更多优惠 >
		</view>
   </view>
	 
  </view>

</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {}
    },
    methods: {
			go(){
				uni.navigateTo({
					url:'../../pages/login/login'
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

</style>
