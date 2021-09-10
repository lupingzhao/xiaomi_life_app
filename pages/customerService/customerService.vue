<template>
	<view id='chatBox'>
		<view class="p-10 t-a-c" style="padding-bottom: 120rpx;">

			<view :id="`chatItem-${index}`" v-for="(item,index) in chatList" :key="index" class=" p-5 chatItem"
				style="margin-bottom: 20rpx;" :class="item.type==='uni'?'t-a-r':'t-a-l'">
				<view class="mb-10 " :class="item.type==='uni'?'t-a-r':''">
					<text v-if="item.type!=='uni'">{{item.value.name}}</text>
					<text class="m-lr-10 font-s-12">{{item.time}}</text>
					<text v-if="item.type==='uni'">{{item.value.name}}</text>
				</view>
				<view class="width-100 flex" :class="[item.type==='uni'?'jce':'jcs']">
					<view v-if="item.type!=='uni'" class="triangle-left"></view>
					<view class="infobox p-10 b-radius-10 " :class="item.type==='uni'?'g':'bgc-low-gray'">
						<view class="width-100 t-a-l">
							{{item.value.data}}
						</view>
					</view>
					<view v-if="item.type==='uni'" class="triangle-bottomleft"></view>
				</view>
			</view>
		</view>
		
		
		<view class="bgc-low-gray fs-box">
			<view class="flex jcsb p-10">
				<view class="width-70">
					<cc-field :value.sync="value"></cc-field>
				</view>
				<view class="m-l-5">
					<cc-button  style="white-space: nowrap;" @click='send'>发送</cc-button>
				</view>
				<image src="../../static/bbq.png" class="m-img m-l-5" mode="" @click="emoj"></image>
			</view>

			<!--表情  -->
			<view class="" v-if="isemojis">
				<scroll-view scroll-y="true" style="height: 30vh;padding-bottom: 20rpx;">
					<view class="flex flex-wrap ">
						<view v-for="item in emojis" :key="item" class="emo-item t-a-c p-tb-5" @click="djem(item)">
							{{ item }}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>

</template>

<script>
	import emoji from '../../lib/emoji.js'
	import dayjs from 'dayjs'


	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				emojis: emoji,
				isemojis: false,
				chatList: []

			}
		},
		methods: {
			// 展开表情
			emoj() {
				this.isemojis = !this.isemojis
			},
			// 点击表情
			djem(e) {
				this.value = this.value + `${e}`
			},
			// 发送消息
			send() {
				// 发送消息
				// this.$socket.emit('event',{})
				this.$socket.emit('event', {
					time: dayjs().format('YYYY-MM-DD HH:mm'),
					value: {
						data: this.value,
						name: uni.getStorageSync('liftUser').username
					},
					type: 'uni',
				})
				this.value = ''
				this.isemojis = false
			},


			getDom() {
				// 获取dom元素
				uni.createSelectorQuery().in(this).selectAll('#chatBox').boundingClientRect(res => {
					// console.log(res[0].bottom)
					uni.pageScrollTo({
						scrollTop: res[0].bottom,
						duration: 0
					});
				}).exec()
			}

		},
		mounted() {

			// 接收数据
			this.$socket.on('broadcast', (res) => {
				this.chatList.push(res)
				this.getDom()
			})
			// 断开链接会触发
			this.$socket.on('disconnect', (res) => {
				uni.showToast({
					title: '已经断开链接',
					icon: 'none'
				})
			})
		},
		onLoad() {

		},
		onShow() {
			// uni.onKeyboardHeightChange(res => {
			// 	console.log(res.height)
			// })
		},
		filters: {},
		computed: {},
		watch: {
			chatList: {
				handler(val) {
					this.$nextTick(() => {
						let top = 0
						let length = this.chatList.length
						if (length) {
							// 动态计算整个盒子的高
							for (let i = 0; i < length; i++) {
								let chatItem = uni.createSelectorQuery().in(this).select(`#chatItem-${i}`)
									.boundingClientRect(res => {								
										top += res.height
										uni.pageScrollTo({
											scrollTop: top,
											duration: 0
										})
									}).exec()
							}
						}
					})
				},
				deep: true
			}
		},
	}
</script>

<style scoped lang="scss">
	.cc-button {
		height: 34px !important;
	}

	.fs-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.emo-item {
		font-size: 40rpx;
		width: calc(100%/6);
	}

	.g {
		background-color: #93ED69;
	}

	// 左三角
	.triangle-bottomleft {
		width: 0;
		height: 0;
		border-bottom: 30rpx solid #93ED69;
		border-right: 30rpx solid transparent;
	}

	// 右三角
	.triangle-left {
		width: 0;
		height: 0;
		border-bottom: 30rpx solid #f5f5f5;
		border-left: 30rpx solid transparent;
	}

	.infobox {
		max-width: 60%;
		word-wrap: break-word;
		white-space: normal;
		word-break: break-all;
		white-space: pre-wrap;
		word-wrap: break-word
	}
</style>
