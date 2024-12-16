<template>
	<view class="order-card">
		<view class="order-card-title">
			<view style="width: fit-content;">{{venueType}}</view>
			<view style="display: flex;align-items: center;">
				<view style="width: fit-content;">{{orderState}} ：</view>
				<view style="width: fit-content;font-size: 35rpx;">¥{{totalAmount}} </view>
			</view>

		</view>
		<view class="thin-line"></view>

		<view class="order-card-detail">
			<view class="order-number-area">
				<view class="order-number-text">订单编号</view>
				<view class="text">{{orderID}}</view>
			</view>
			<view class="reservation-date-area">
				<view class="reservation-date-text">预约日期</view>
				<view class="text">{{reservationDate}}</view>
			</view>
			<view class="use-date-area">
				<view class="use-date-text">使用日期</view>
				<view class="text">{{useDate}}</view>
			</view>
		</view>
		<view class="thick-line"></view>
		<view class="venue">
			<view class="number-time">
				<view class="venue-number-area">{{venue1.number+1}} 号场</view>
				<view class="time-area">
					<view class="sometime" v-for="(item,index) in venue1.time" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="price-area">¥{{venue1.price}}</view>
		</view>
		<view class="thick-line" v-if="show"></view>
		<view class="venue" v-if="show">
			<view class="number-time">
				<view class="venue-number-area">{{venue2.number+1}} 号场</view>
				<view class="time-area">
					<view class="sometime" v-for="(item,index) in venue2.time" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="price-area">¥{{venue2.price}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
	} from 'vue';
	let venueType = ref(null)
	let orderState = ref(null)
	let totalAmount = ref(null)
	let orderID = ref(null)
	let venueCount = ref(null)
	let reservationDate = ref(null)
	let useDate = ref(null)

	let venue1 = ref({
		number: Number,
		time: [],
		price: Number
	})
	let venue2 = ref({
		number: Number,
		time: [],
		price: Number
	})
	let show = computed(
		() => {
			if (venueCount.value == 2) {
				return true
			} else {
				return false
			}
		}
	)

	function set_Info(state, type, id, count, reservation_date, use_date, v1, v2) {
		orderState.value = state
		venueType.value = type
		orderID.value = id
		reservationDate.value = reservation_date
		useDate.value = use_date
		venueCount.value = count
		venue1.value = v1
		venue2.value = v2
		totalAmount = venue1.value.price + venue2.value.price
	}
	defineExpose({
		set_Info
	})
</script>

<style lang="scss">
	.order-card {
		background-color: #fff;
		width: 100%;

		border-radius: 15rpx;

		.order-card-title {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
		}

		.thin-line {
			width: 94%;
			height: 0.5px;
			margin: auto;
			background-color: #c6c6c6;
		}



		.order-card-detail {
			padding: 30rpx;

			.text {
				font-size: 27rpx;
			}

			.order-number-area {
				margin-bottom: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;


				.order-number-text {
					width: fit-content;
					color: #6b6b6b;
					font-size: 26rpx;
				}

			}

			.reservation-date-area {
				display: flex;
				margin-bottom: 10rpx;
				justify-content: space-between;
				align-items: center;

				.reservation-date-text {
					width: fit-content;
					color: #6b6b6b;
					font-size: 26rpx;
				}

			}

			.use-date-area {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.use-date-text {
					width: fit-content;
					color: #6b6b6b;
					font-size: 26rpx;
				}

			}


		}

		.thick-line {
			width: 94%;
			height: 4px;
			margin: auto;
			background-color: #e3e3e3;
		}



		.venue {
			box-sizing: border-box;
			width: 100%;
			padding: 30rpx;
			display: flex;

			.number-time {

				.venue-number-area {
					margin-bottom: 15rpx;
					width: fit-content;
					font-weight: bold;
					font-size: 30rpx;
				}

				.time-area {
					width: 475rpx;
					display: flex;
					flex-wrap: wrap;
					font-size: 25rpx;
					color: #6b6b6b;


					.sometime {
						margin-right: 20rpx;
					}
				}

			}

			.price-area {
				flex: 1;
				align-self: center;
				text-align: end;
				font-weight: 500;
				font-size: 30rpx;
			}

		}

	}
</style>