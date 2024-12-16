<template>
	<view class="order-management">
		<venues-select class="segmented-control"></venues-select>
		<view class="order-list">
			<order-card ref="orders"></order-card>
			<view class="operation-area">
				<button type="primary" disabled="true">取消处理</button>
				<button type="warn">删除订单</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	const orders = ref()
	const order = store.state.useOrderList.orderList[0]
	onReady(() => {
		orders.value.set_Info("待使用", order.type, order.id, order.count, order.usedDate,
			order.venue1, order.venue2)
	})
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.order-management {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.segmented-control {
			width: 100%;
		}

		.order-list {
			width: 90%;
			margin: 35rpx;

			.operation-area {
				display: flex;

				button {
					width: 50%;
					font-size: 25rpx;
				}
			}
		}
	}
</style>