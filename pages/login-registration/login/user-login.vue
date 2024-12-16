<template>
	<view class="login">
		<view class="login-title">体育场馆预约</view>
		<view class="login-content">
			<view class="login-phone">
				<uni-easyinput type="number" placeholder="请输入手机号" v-model="phone" maxlength="11"></uni-easyinput>
			</view>
			<view class="login-password">
				<uni-easyinput type="password" placeholder="密码长度在6-16位之间" v-model="password" maxlength="16"
					passwordIcon></uni-easyinput>
			</view>
		</view>
		<view style="margin-top: 75rpx;">
			<button class="login-button" type="primary" @click="login_Submit()">登录</button>
		</view>
		<view class="registration-findPassword">
			<view class="login-registration" @click="Registration()">注册账号</view>
			<span>|</span>
			<view class="login-password" @click="find_Password()">找回密码</view>
		</view>
		<view class="admin-login">
			<button type="primary" @click="wx_Login()">微信登录</button>
		</view>
	</view>
</template>

<script setup>
	const baseUrl = getApp().globalData.baseUrl
	let phone = ref([null])
	let password = ref([null])
	const gd = getApp().globalData

	function login_success(title) {
		uni.showToast({
			title: title,
			duration: 750,
			mask: true,
		})
		setTimeout(() => {
			uni.switchTab({
				url: "/pages/my/my"
			})
		}, 750)
	}

	function login_Submit() {
		if (phone.value == '' || password.value == '') {
			if (phone.value == '') {
				uni.showToast({
					title: "请输入手机号！",
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
			if (!gd.checkPhone.check_Phone(phone.value)) {
				uni.showToast({
					title: "手机号错误！",
					icon: "none"
				})
			} else {
				let pwdLength = password.value.length
				if (!gd.checkPassword.check_Password(pwdLength)) {
					uni.showToast({
						title: "密码不能少于6位！",
						icon: "none"
					})
				} else {
					uni.request({
						url: baseUrl + "/auth/login/user",
						// url: "https://credible-halibut-sound.ngrok-free.app/auth/login/user",
						method: "POST",
						data: {
							phone: phone.value,
							password: password.value,
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"ngrok-skip-browser-warning": "true",
						},
						success: (res) => {
							if (res.data.code == 0) {
								uni.setStorageSync('loginState', true)
								uni.setStorageSync('userInfo', res.data.userInfo)
								login_success(res.data.msg)
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
						},
						fail: (err) => {
							uni.showToast({
								title: err.errMsg,
								icon: "error"
							})
						}
					})
				}

			}

		}
	}

	function Registration() {
		uni.navigateTo({
			url: '/pages/login-registration/registration/registration'
		})
	}

	function wx_Login() {
		// uni.navigateTo({
		// 	url: '/pages/login-registration/login/admin-login'
		// })
		uni.login({
			provider: 'weixin',
			onlyAuthorize:true,
			success: (res) => {
				console.log('res.code :>> ', res.code);
			},
			fail: (err) => {
				uni.showToast({
					title: err.errMsg,
					icon: "error"
				})
			}
		});
		uni.getUserProfile({
			desc:"帮助用户快速填写头像昵称",
			lang:"zh_CN",
			success: (res) => {
				console.log('res.userInfo :>> ', res.userInfo);
			}
		})
	}
</script>

<style lang="scss">
	.login {
		// background-image: linear-gradient(120deg, #05ee28, #6a3dad);
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
			.login-phone {
				display: flex;
				align-items: center;
				margin: 0 50rpx;

				.uni-easyinput__content {
					height: 90rpx;
				}

				.uni-easyinput__placeholder-class {
					font-size: 30rpx;
				}

				.uni-easyinput__content-input {
					font-size: 40rpx;
				}
			}

			.login-password {
				display: flex;
				align-items: center;
				margin: 0 50rpx;
				margin-top: 25rpx;

				.uni-easyinput__content {
					height: 90rpx;
				}

				.uni-easyinput__placeholder-class {
					font-size: 30rpx;
				}

				.uni-easyinput__content-input {
					font-size: 40rpx;
				}
			}

		}

		.login-button {
			width: 86%;
		}

		.registration-findPassword {
			display: flex;
			justify-content: center;
			margin-top: 100rpx;

			.login-registration {
				padding: 0 15rpx;
				color: #11c53e;
			}

			.login-password {
				padding: 0 15rpx;
				color: #11c53e;
			}

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