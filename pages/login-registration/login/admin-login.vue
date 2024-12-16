<template>
	<view class="login">
		<view class="login-title">管理员登录入口</view>
		<view class="login-content">
			<view class="login-account">
				<input type="text" placeholder="请输入管理员账号" v-model="account">
			</view>
			<view class="login-password">
				<input type="text" placeholder="请输入密码" password v-model="password">
			</view>
		</view>
		<view style="margin-top: 100rpx;">
			<button class="login-button" @click="login_Submit()">登录</button>
		</view>
	</view>
</template>

<script setup>
	const baseUrl = getApp().globalData.baseUrl
	let account = ref([null])
	let password = ref([null])

	function login_Submit() {
		if (account.value == '' || password.value == '') {
			if (account.value == '') {
				uni.showToast({
					title: "请输入管理员账号！",
					icon: "none"
				})
				return
			}
			if (password.value == '') {
				uni.showToast({
					title: "请输入密码！",
					icon: "none"
				})
			}
		} else {
			uni.request({
				url: baseUrl + "/auth/login/admin",
				method: "POST",
				data: {
					account: account.value,
					password: password.value,
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					if (res.data.code == 0) {
						uni.reLaunch({
							url: "/pages/admin/admin-main-interface"
						})
					}
					if (res.data.code == 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
					if (res.data.code == 2) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				}
			})
		}
	}
</script>

<style lang="less">
	.login {
		background-color: #fff;
		width: 100%;
		background-position: center;
		background-size: cover;
		margin: 0px;
		background-size: 100% 100%;
		background-attachment: fixed;
		height: 1535rpx;
		opacity: 0.8;

		.login-title {
			padding-top: 150rpx;
			display: flex;
			justify-content: flex-start;
			margin-left: 50rpx;
			font-weight: 700;
			font-size: 40rpx;
			color: #11cd6e;
			letter-spacing: 5rpx;
			margin-bottom: 50rpx;
		}

		.login-content {
			.login-account {
				display: flex;
				align-items: center;
				margin: 0 50rpx;
				border-bottom: 1rpx solid gainsboro;

				input {
					padding: 10rpx;
					height: 60rpx;
					width: 80%;
				}
			}

			.login-password {
				display: flex;
				align-items: center;
				margin: 0 50rpx;
				border-bottom: 1rpx solid gainsboro;
				margin-top: 50rpx;

				input {
					padding: 10rpx;
					height: 60rpx;
					width: 80%;
				}
			}
		}



		.login-button {
			background-color: #11c53e;
			width: 90%;
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			color: #fff;
		}

		.admin-login {
			width: 100%;
			margin-top: 40rpx;
			display: flex;
			justify-content: center;

			button {
				font-size: 25rpx;
			}
		}

	}
</style>