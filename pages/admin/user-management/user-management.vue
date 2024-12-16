<template>
	<view class="user-management">
		<uni-search-bar placeholder="输入用户昵称或者ID" bgColor="#fff" @confirm="search" :focus="true" v-model="searchValue"
			@blur="blur" @focus="focus" @input="input" @cancel="cancel" @clear="clear">
		</uni-search-bar>
		<view style="width: 94%;">
			<user v-for="(item,index) in userList" :key="index" :index="index" :userInfo="userList[index]"></user>
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	let userList = ref(store.state.users.userList)
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.user-management {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		uni-search-bar {
			margin-top: 30rpx;
			margin-bottom: 20rpx;
			width: 94%;
		}


		user {
			width: 100%;
		}

	}
</style>