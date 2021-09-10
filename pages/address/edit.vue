<template>
	<view class=" ">
		<!-- 编辑 添加地址 -->
		<view class=" m-c">

			<!-- 编辑 -->
			<view class="" v-if='list'>
				<cc-field :value.sync="list.name" label="姓名"></cc-field>
				<cc-field :value.sync="list.tel" type="tel" label="电话"></cc-field>
				<view class="flex pr-25" @click="show2=true">
					<cc-field :value.sync="list.address_area" label="地区" :readonly='true'></cc-field>
					>
				</view>
				<cc-field :value.sync="list.detailAddress" label="详细地址"></cc-field>
				<view class="flex p-15 jcsb">
					<view class="font-s-16">
						设置为默认地址
					</view>
					<cc-switch :value.sync="list.isDefault"></cc-switch>
				</view>
				<view class="m-tb-10 width-90">
					<cc-button round type="error" block @click='edits'>保存</cc-button>
				</view>
				<view class="width-90 m-c">
					<cc-button round block @click='dels'>删除</cc-button>
				</view>
			</view>

			<!-- 新增 -->
			<cc-address-edit @save='save' :showDelete='false' v-else></cc-address-edit>
		</view>



		<cc-mask :show.sync="show2" class="flex area">
			<!-- 省市区 -->
			<view class="width-100 box1">
				<cc-area title='' cancelText='' @confirm='change'></cc-area>
			</view>

		</cc-mask>

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


	export default {
		components: {},
		props: {},
		data() {
			return {
				list: '',
				show2: false
			}
		},
		methods: {
			...addressActions(['add', 'del', 'edit', 'setDefault']),
			// 添加按钮
			save(e) {
				if (e.name && e.tel && e.province && e.city && e.county && e.addressDetail) {
					this.add({
						// 用户id
						user_id: uni.getStorageSync('userId'),
						// 用户名
						username: e.name,
						// 用户电话
						mobile: e.tel,
						// 用户省市区地址
						address: e.province + e.city + e.county,
						// 用户详细地址
						detailAddress: e.addressDetail,
						// 是否是默认地址
						isDefault: e.isDefault,
						areaCode: e.areaCode
					})
					uni.navigateBack()
				}else{
					uni.showToast({
						title:'有输入项未填写',
						icon:'none'
					})
				}
			},
			// 编辑
			edits() {
				if (this.list && this.list.tel && this.list.address_area && this.list.detailAddress) {
					this.edit({
						// 用户id
						user_id: this.list.user_id,
						// 用户名
						username: this.list.name,
						// 用户电话
						mobile: this.list.tel,
						// 用户省市区地址
						address: this.list.address_area,
						// 用户详细地址
						detailAddress: this.list.detailAddress,
						// 是否是默认地址
						isDefault: this.list.isDefault,
						// 地址id
						id: this.list.id
					})
				}else{
					uni.showToast({
						title:'有输入项未填写',
						icon:'none'
					})
				}
			},
			// 删除
			dels() {
				this.del({
					addressId: this.list.id,
					// 用户id
					user_id: this.list.user_id,
				})
			},
			// 地区
			change(e) {
				let a = ''
				e.map(i => {
					a += i.name
				})
				this.list.address_area = a
			}
		},
		mounted() {

		},
		onLoad(e) {
			if (e.adress !== "false") {
				this.list = JSON.parse(e.adress)
			}
			if (!this.list) {
				uni.setNavigationBarTitle({
					title: '新增地址'
				})
			}

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.area {
		flex-direction: column;
		justify-content: flex-end;
	}

	.box1 {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
