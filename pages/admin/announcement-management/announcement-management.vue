<template>
	<view class="announcement-management">
		<view class="main">
			<view class="announcement" v-for="(item,index) in ann" :key="index">
				<announcement :ann="ann[index]" :radius="true"></announcement>
				<view class="action-area">
					<button size="default" type="primary">编辑</button>
					<button size="default" type="warn" @click="deleteAnn(index)">删除</button>
				</view>
			</view>
		</view>
		<button class="add-announcement" type="primary">添加公告</button>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	const ann = store.state.announcement.annList

	function deleteAnn(index) {
		uni.showModal({
			title: "是否删除？",
			confirmText: "否",
			cancelText: "是",
			confirmColor: "#11c53e",
			cancelColor: "#ff0000",
			success: (res) => {
				if (res.cancel) {
					store.commit('delete_Ann', index)
					uni.showToast({})
				}
			}
		})
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.announcement-management {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			width: 400rpx;
			height: 100rpx;
			background-color: white;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2px solid #11c53e;
			border-radius: 20rpx;
			font-size: 40rpx;
		}

		.main {
			width: 90%;
			margin-top: 50rpx;
			margin-bottom: 100rpx;

			.announcement {
				width: 100%;

				.action-area {
					background: #fff;
					display: flex;
					margin-bottom: 40rpx;
					padding-bottom: 30rpx;
					border-bottom-left-radius: 20rpx;
					border-bottom-right-radius: 20rpx;

					button {
						width: 30%;
						font-size: 22rpx;
						text-align: center;
					}
				}

			}
		}

		.add-announcement {
			position: fixed;
			width: 100%;
			bottom: 0;
			border: 1rpx solid #11c53e;
			border-radius: 0rpx;
		}


	}
</style>