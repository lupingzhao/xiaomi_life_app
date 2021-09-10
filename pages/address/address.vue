<template>
	<view class="p-10 bgc-low-gray b-box">
		<cc-address-list :value="chosenAddressId" v-if='address1.length' :list="address1"
			:disabled-list="disabledList" disabled-text="以下地址超出配送范围" default-tag-text="默认" @add='add' @edit='edit'
			@select='select'></cc-address-list>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	// 获取命名空间
	let addressModeule = createNamespacedHelpers('address')
	// 解构模块化里的数据与请求方法
	let {
		mapState: addressState,
		mapActions: addressActions
	} = addressModeule

	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {},
		props: {},
		data() {
			return {
				chosenAddressId: '',
				isfrom: false,
				address1: [],
				disabledList: [{
					id: '3',
					name: '王五',
					tel: '1320000000',
					address: '浙江省杭州市滨江区江南大道 15 号'
				}]
			}

		},
		methods: {
			...addressActions(['getAppAddress', 'del', 'edit', 'setDefault']),
			// 新增/
			add(e) {
				uni.navigateTo({
					url: `./edit?adress=false`
				})
			},
			// 编辑
			edit(e) {
				let list = JSON.stringify(e.item)
				uni.navigateTo({
					url: `./edit?adress=${list}`
				})
			},
			// 切换地址
			select(e) {
				if (this.isfrom) {
					uni.setStorageSync('DefaultAddress', e.item)
					uni.navigateTo({
						url: `../order/order?boo=${1}`
					})
				} else {
					// // 修改默认
					this.setDefault({
						// 地址id
						addressId: e.item.id,
						// 用户id
						user_id: e.item.user_id
					})
				}

			}
		},
		mounted() {
		},
		onLoad(e) {
			this.isfrom = Number(e.boo)
		},
		onShow() {
			this.getAppAddress(uni.getStorageSync('userId'))
		},
		filters: {},
		computed: {
			...addressState(['address']),

		},
		watch: {
			address(val) {
				val.map(i => {				
					if (i.isDefault) {
						this.chosenAddressId = i.id
					}
				})
				
				this.address1 = cloneDeep(val)
			}
		},
	}
</script>

<style scoped lang="scss">
	.b-box {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
