<template>
	<view class="to-be-paid">
		<view class="Card" v-if="show">
			<order-card ref="toBePaidOrder"></order-card>
		</view>

		<view class="option" v-if="show">
			<button type="primary" @click="pay()">付款</button>
			<button type="warn" @click="cancel()">取消</button>
		</view>
		<view class="empty" v-if="!show">
			这里什么也没有哦
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	import {
		computed,
	} from 'vue';
	const sc = useStore().commit
	const gd = getApp().globalData
	const toBePaidOrder = ref()
	const order = uni.getStorageSync('orderInfo') ? uni.getStorageSync('orderInfo') : null
	const orderState = order ? order.state : null
	const timeField1 = uni.getStorageSync('timeField1')
	const timeField2 = uni.getStorageSync('timeField2') ? uni.getStorageSync('timeField2') : ""
	const id1 = order ? order.venue1.number + 1 : null
	const id2 = order ? order.venue2.number + 1 : null
	let show = computed(
		() => {
			if (orderState == '待支付') {
				return true
			} else {
				return false
			}
		}
	)

	onReady(() => {
		if (show.value == true) {
			toBePaidOrder.value.set_Info(orderState, order.venueType, order.id, order.count, order.reservationDate,
				order.useDate, order.venue1, order.venue2)
		}
	})

	function pay() {
		uni.showModal({
			title: "是否支付？",
			confirmText: "取消",
			cancelText: "支付",
			confirmColor: "#ff0000",
			cancelColor: "#11c53e",
			success: (option) => {
				//点击了确认支付
				if (option.cancel) {
					const url = uni.getStorageSync('changeVenueStateUrl')
					gd.changeVenueState.changeVenueState(order.count, id1, id2, timeField1,
							timeField2, url, true)
						.then(
							res => {
								//服务器返回检查场地状态成功,res是服务器返回的结果
								if (res.success == true) {
									order.state = '待使用'
									gd.saveOrderData.saveOrderData(order, '/order/saveOrderData')
									uni.removeStorageSync('orderInfo')
									uni.removeStorageSync('timeField1')
									uni.removeStorageSync('timeField2')
									uni.removeStorageSync('changeVenueStateUrl')
									uni.showToast({
										title: '支付成功',
										duration: 1000,
										mask: true,
										success: () => {
											setTimeout(() => {
												uni.switchTab({
													url: '/pages/my/my'
												})
											}, 1000)
										}
									})
									//服务器返回检查场地状态失败
								} else if (res.success == false) {
									uni.showToast({
										title: '支付失败！',
										duration: 1000,
										mask: true,
										success: () => {
											console.log('服务器返回检查场地状态失败：', res);
											setTimeout(() => {
												uni.redirectTo({
													url: '/pages/reservation/reservation'
												})
											}, 1000)
										}
									})
								}
							}).catch(error => {
							console.log(error);
						})

				}
			}
		})
	}

	function cancel() {
		uni.showModal({
			title: "是否取消订单？",
			confirmText: "否",
			cancelText: "是",
			confirmColor: "#11c53e",
			cancelColor: "#ff0000",
			success: (option) => {
				//点击了确认取消
				if (option.cancel) {
					order.state = '已取消'
					uni.removeStorageSync('timeField1')
					uni.removeStorageSync('timeField2')
					uni.removeStorageSync('changeVenueStateUrl')
					sc('add_canceled_Order_List', order)
					//显示取消成功并跳转到首页
					uni.showToast({
						title: '取消成功',
						duration: 500,
						mask: true,
						success: () => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					})
				}
			}
		})
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.to-be-paid {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.Card {
			width: 86%;
			margin-top: 35rpx;
		}

		.option {
			display: flex;
			position: fixed;
			width: 100%;
			bottom: 0;

			button {
				width: 50%;
				border-radius: 0rpx;
			}
		}

		.empty {
			position: absolute;
			top: 50%;
			margin: auto;
			font-size: 50rpx;
		}
	}
</style>