<template>
	<view class="userInfo">
		<view class="avatar">
			<!-- 杰哥 -->
			<!-- <image
				src="https://x0.ifengimg.com/res/2022/399E0E0C165D8611513A9A2DD0F7CEAFAE62111A_size403_w1080_h606.png"
				mode="aspectFill">
			</image> -->
			<!-- 阿伟 -->
			<!-- <image src="https://c-ssl.duitang.com/uploads/item/202010/26/20201026231603_pwydf.thumb.1000_0.jpg"></image> -->
			<!-- 广工 -->
			<!-- <image src="https://www.gdut.edu.cn/__local/3/C3/9F/801A80A5725DCD34C5E62C95E6B_E6F75E67_FEA5.jpg">
			</image> -->
			<!-- 蔡徐坤 -->
			<image
				src="https://tse4-mm.cn.bing.net/th/id/OIP-C.5RpOYYh726ch5Vws2sy38QAAAA?w=203&h=202&c=7&r=0&o=5&pid=1.7">
			</image>

		</view>
		<view class="hello" @click="hasNotLogin(loginState,'',true)">
			<view style="font-size: 40rpx;font-weight: 200;margin-top: 1rpx;">你好，</view>
			<view class="nickname">{{nickname}}</view>
		</view>
	</view>

	<view class="rounded-Square-Order">
		<text style="padding-left: 20px;padding-top: 20px;padding-bottom: 5px;">我的订单</text>
		<view class="order-status">
			<view class="order-option">
				<image src="../../static/order_icon/to-be-paid.png"
					@click="hasNotLogin(loginState,'/pages/order/to-be-paid',false)"></image>
				<view>待支付</view>
			</view>
			<view class="order-option">
				<image src="../../static/order_icon/to-be-used.png"
					@click="hasNotLogin(loginState,'/pages/order/to-be-used',false)"></image>
				<view>待使用</view>
			</view>
			<view class="order-option">
				<image src="../../static/order_icon/finished.png"
					@click="hasNotLogin(loginState,'/pages/order/finished',false)">
				</image>
				<view>已完成</view>
			</view>
			<view class="order-option">
				<image src="../../static/order_icon/cancelled.png"
					@click="hasNotLogin(loginState,'/pages/order/canceled',false)">
				</image>
				<view>已取消</view>
			</view>
			<view class="order-option">
				<image src="../../static/order_icon/after-sales.png"
					@click="hasNotLogin(loginState,'/pages/order/after-sales',false)"></image>
				<view>售后</view>
			</view>

		</view>
	</view>
	<view class="view-button">
		<button @click="hasNotLogin(loginState,'/pages/my/changeNickname',false)">修改昵称</button>
	</view>
	<view class="view-button">
		<button @click="hasNotLogin(loginState,'/pages/my/changePassword',false)">修改密码</button>
	</view>
	<view class="view-button">
		<button :disabled="!loginState" @click="login_Out()">退出账号</button>
	</view>
</template>

<script setup>
	const gd = getApp().globalData
	let userInfo = ref(Object)
	let nickname = ref(String)
	let loginState = ref(Boolean)
	onShow(() => {
		loginState.value = uni.getStorageSync('loginState')
		userInfo.value = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : null
		if (userInfo.value == null) {
			nickname.value = "请登录"
		} else {
			nickname.value = userInfo.value.nickname
		}
	})

	function hasNotLogin(loginState, path, direct) {
		gd.loginVerification.loginVerification(loginState, path, direct)
	}

	function login_Out() {
		uni.showModal({
			title: "是否退出登录？",
			confirmText: "否",
			cancelText: "是",
			confirmColor: "#000000",
			success: (res) => {
				if (res.cancel) {
					uni.removeStorageSync('loginState')
					uni.removeStorageSync('userInfo')
					uni.removeStorageSync('orderInfo')
					uni.navigateTo({
						url: "/pages/login-registration/login/user-login"
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

	.userInfo {
		width: 100%;
		height: 200px;
		display: flex;
		align-items: center;
		flex-direction: column;

		.avatar {
			padding-top: 40px;
		}

		image {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}

		.hello {
			padding-top: 10px;
			display: flex;

			.nickname {
				font-size: 40rpx;
			}
		}
	}

	.rounded-Square-Order {
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		margin: 10px auto;
		width: 95%;
		height: 150px;
		border-radius: 10px;
	}

	.order-status {
		display: flex;
		flex: 1;
		justify-content: space-around;
		align-items: center;
		padding: 10px;

		view {
			width: 120rpx;
			height: 120rpx;
			text-align: center;
		}
	}

	.order-option {
		image {
			width: 50rpx;
			height: 50rpx;
		}
	}

	.view-button {
		background-color: #ffffff;
		width: 95%;
		margin: 0 auto;
		border-radius: 5px;

		button {
			background-color: #ffffff;
		}
	}
</style>