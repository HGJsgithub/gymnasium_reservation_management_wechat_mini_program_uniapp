<template>
	<view class="to-be-used">
		<view class="Card" v-if="show">
			<after-sales-card v-for="(item,index) in orderList" :key="index"
				:afterSalesOrder="orderList[index]"></after-sales-card>
		</view>
		<view class="empty" v-if="!show">
			这里什么也没有哦
		</view>
	</view>
</template>

<script setup>
	uni.showLoading({
		title: '加载中'
	});
	const baseUrl = getApp().globalData.baseUrl
	const userID = uni.getStorageSync('userInfo').id
	let orderList = []
	let show = ref(false)
	uni.request({
		url: baseUrl + "/order/getOrderData",
		method: 'POST',
		data: {
			userID: userID,
			state: '待处理'
		},
		header: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		success: (res) => {
			if (res.data.orderData != null) {
				orderList = res.data.orderData.reverse()
			}
			show.value = res.data.status
			uni.hideLoading()
		},
		fail: (res) => {
			console.log('发送网络请求读取售后订单时出现异常：', res);
			uni.hideLoading()
			uni.showToast({
				title: '读取售后订单错误！',
				icon: 'fail',
				success: () => {
					uni.switchTab({
						url: '/pages/my/my'
					})
				}
			})
		}
	})
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.to-be-used {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.Card {
			width: 86%;
		}

		.empty {
			position: absolute;
			top: 50%;
			margin: auto;
			font-size: 50rpx;
		}
	}
</style>