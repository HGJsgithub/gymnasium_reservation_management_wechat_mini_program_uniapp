<template>
	<view class="to-be-used">
		<view class="Card" v-if="show">
			<used-card v-for="(item,index) in orderList" :key="index" :usedOrder="orderList[index]"></used-card>
		</view>
		<view class="empty" v-if="!show">
			这里什么也没有哦
		</view>
	</view>
</template>

<script setup>
	let show = false
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