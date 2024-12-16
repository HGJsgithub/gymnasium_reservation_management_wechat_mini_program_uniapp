<template>
	<view class="canceled">
		<view class="Card" v-if="show">
			<canceled-card v-for="(item,index) in orderList" :key="index"
				:canceledOrder="orderList[index]"></canceled-card>
		</view>
		<view class="empty" v-if="!show">
			这里什么也没有哦
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
	} from 'vue';
	let orderList = []
	let show = computed(
		() => {
			if (orderList.length != 0) {
				return true
			} else {
				return false
			}
		}
	)
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.canceled {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.Card {
			width: 86%;
		}

		// .cancel {
		// 	position: fixed;
		// 	width: 100%;
		// 	bottom: 0;
		// 	border-radius: 0rpx;
		// }

		.empty {
			position: absolute;
			top: 50%;
			margin: auto;
			font-size: 50rpx;
		}
	}
</style>