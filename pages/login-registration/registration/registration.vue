<template>
	<view class="registration">
		<view class="registration-content">
			<view class="input-area">
				<uni-easyinput type="number" placeholder="请输入手机号" v-model="newUser.phone"
					maxlength="11"></uni-easyinput>
			</view>
			<view class="input-area">
				<uni-easyinput type="text" placeholder="请输入昵称" v-model="newUser.nickname"
					maxlength="10"></uni-easyinput>
			</view>
			<view class="input-area">
				<uni-easyinput type="password" placeholder="密码长度在6-16位之间" v-model="newUser.password" maxlength="16"
					passwordIcon></uni-easyinput>
			</view>
			<view class="input-area">
				<uni-easyinput type="password" placeholder="请再次确认密码" v-model="confirmPwd" maxlength="16"
					passwordIcon></uni-easyinput>
			</view>
		</view>
		<view style="margin-top: 100rpx;">
			<button class="registration-button" @click="onsubmit()">提交注册</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		useStore
	} from 'vuex'
	const baseUrl = getApp().globalData.baseUrl
	const ss = useStore().state
	let newUser = ref({
		id: String,
		phone: String,
		nickname: String,
		password: String,
		createTime: String,
	})
	let confirmPwd = ref([null])
	const gd = getApp().globalData

	function check_password_Same(pwd, confirmPwd) {
		if (pwd == confirmPwd) {
			return true
		} else {
			return false
		}
	}

	function generate_ID(date, phone) {
		return `${date}${phone}`
	}

	function onsubmit() {
		if (newUser.value.phone == '' || newUser.value.nickname == '' || newUser.value.password == '' || confirmPwd
			.value == '') {
			if (newUser.value.phone == '') {
				uni.showToast({
					title: "请输入手机号！",
					icon: "none"
				})
			} else if (newUser.value.nickname == '') {
				uni.showToast({
					title: "请输入昵称！",
					icon: "none"
				})
			} else if (newUser.value.password == '') {
				uni.showToast({
					title: "请输入密码！",
					icon: "none"
				})
			} else if (confirmPwd.value == '') {
				uni.showToast({
					title: "请再次输入密码！",
					icon: "none"
				})
			}
		} else {
			if (!gd.checkPhone.check_Phone(newUser.value.phone)) {
				uni.showToast({
					title: "手机号错误！",
					icon: "none"
				})
			} else {
				let pwdLength = newUser.value.password.length
				if (!gd.checkPassword.check_Password(pwdLength)) {
					uni.showToast({
						title: "密码不能少于6位！",
						icon: "none"
					})
				} else {
					if (!check_password_Same(newUser.value.password, confirmPwd.value)) {
						uni.showToast({
							title: "两次输入的密码不同！",
							icon: "none"
						})

					} else {
						newUser.value.id = generate_ID(ss.date.date, newUser.value.phone)
						newUser.value.createTime = ss.date.formattedDate
						uni.request({
							url: baseUrl + "/auth/registration",
							method: "POST",
							data: newUser.value,
							header: {
								"Content-Type": "application/json",
								"ngrok-skip-browser-warning": "true",
							},
							success: (res) => {
								console.log('res.data :>> ', res.data);
								if (res.data.code == 0) {
									uni.showToast({
										title: res.data.msg,
										duration: 1000,
										mask: true,
										success: () => {
											uni.setStorageSync('loginState', true)
											uni.setStorageSync('userInfo', newUser.value)
											setTimeout(() => {
												uni.switchTab({
													url: "/pages/my/my"
												})
											}, 1000)
										}
									})
								} else {
									if (res.data.code == 1) {
										uni.showToast({
											title: res.data.msg,
											duration: 1000,
											mask: true,
										})
									} else {
										uni.showToast({
											title: "出现未知错误！",
											duration: 1000,
											mask: true,
										})
									}
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
	}
</script>

<style lang="scss">
	.registration {
		width: 100%;

		.registration-content {
			display: flex;
			flex-direction: column;
			margin: 30rpx;
			padding: 25rpx;
			padding-top: 20rpx;
			padding-bottom: 45rpx;

			border: 1.5px solid #11c53e;
			border-radius: 20rpx;

			.input-area {
				display: flex;
				align-items: center;
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

		.registration-button {
			background-color: #11c53e;
			width: 90%;
			height: 85rpx;
			text-align: center;
			line-height: 85rpx;
			color: #fff;
		}
	}
</style>