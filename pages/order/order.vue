<template>
	<view class="order">
		<view class="order-list">
			<order-card></order-card>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.order {
		width: 100%;
		display: flex;
		flex-direction: column;

		.order-list {
			width: 90%;
			margin: 35rpx;
		}
	}
</style>