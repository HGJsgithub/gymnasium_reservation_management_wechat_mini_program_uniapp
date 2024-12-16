<template>
	<view class="admin">
		<view class="title">
			管理员界面
		</view>
		<view style="width: 90%;margin-top: 100rpx;">
			<navigator url="/pages/admin/announcement-management/announcement-management">
				<button>公告管理</button>
			</navigator>
			<navigator url="/pages/admin/venue-management/venue-management">
				<button>场地管理</button>
			</navigator>
			<navigator url="/pages/admin/user-management/user-management">
				<button>用户管理</button>
			</navigator>
			<navigator url="/pages/admin/order-management/order-management">
				<button>订单管理</button>
			</navigator>
			<navigator>
				<button>修改密码</button>
			</navigator>
		</view>
		<view>
			<button class="exit" style="background-color: #11c53e;" @click="exit()">退出</button>
		</view>
	</view>


</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	onLoad(() => {
		async function get_Users() {
			let recUserList = await uni.request({
				url: "http://localhost:8080/users/get"
			})
			store.commit('set_User_List', recUserList.data)
		}
		get_Users()

	})

	function exit() {
		store.commit('delete_User_List')
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.admin {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			width: 200rpx;
			height: 100rpx;
			background-color: white;
			margin-top: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2px solid #11c53e;
			border-radius: 20rpx;
		}

		button {
			background: #fff;
			margin: 20rpx;
			border: 1rpx solid #11c53e;
		}

		.exit {
			width: 300rpx;
			color: #fff;
			border-radius: 30rpx;
			margin-top: 400rpx;
		}
	}
</style>