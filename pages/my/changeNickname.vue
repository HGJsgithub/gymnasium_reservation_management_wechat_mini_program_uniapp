<template>
	<view>
		<view class="inputNickname">
			<uni-easyinput :value="nickname" v-model="nickname" placeholder="请输入昵称" auto-focus="true"
				maxlength="10"></uni-easyinput>
			<view style="padding-left: 20rpx;padding-top: 10rpx;">
				昵称长度在2-10个字符之间
			</view>
		</view>
		<button class="saveButton" type="primary" @click="changeNickname(nickname)">保存</button>
	</view>
</template>

<script setup>
	let userInfo = uni.getStorageSync('userInfo')
	let nickname = ref(userInfo.nickname)

	function changeNickname(newNickname) {
		const baseUrl = getApp().globalData.baseUrl
		if (newNickname.length < 2) {
			uni.showToast({
				title: '至少要2个字符哦',
				icon: 'none',
				duration: 500
			})
			return
		}
		uni.request({
			url: baseUrl + '/changeNickname',
			method: 'POST',
			data: {
				id: userInfo.id,
				nickname: newNickname
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			success: (res) => {
				if (res.data.status == true) {
					userInfo.nickname = newNickname
					uni.setStorageSync('userInfo', userInfo)
					uni.showToast({
						title: '保存成功',
						icon: 'success',
						duration: 500
					})
				}
			},
			fail: (res) => {
				console.log('发送网络请求修改昵称时出现异常：', res);
				uni.showToast({
					title: '修改昵称错误！',
					icon: 'fail',
					success: () => {
						uni.switchTab({
							url: '/pages/my/my'
						})
					}
				})
			}
		})
	}
</script>

<style lang="scss">
	.inputNickname {
		width: 90%;
		margin: auto;
		margin-top: 50rpx;

		.uni-easyinput__content-input {
			font-size: 35rpx;
		}
	}

	.saveButton {
		position: fixed;
		width: 100%;
		bottom: 0;
		border-radius: 0rpx;
	}
</style>