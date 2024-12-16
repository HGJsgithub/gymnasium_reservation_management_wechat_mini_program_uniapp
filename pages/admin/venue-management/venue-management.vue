<template>
	<view class="venue-management">
		<venues-select class="venues-select"></venues-select>
		<view class="select-date">
			<uni-segmented-control :current="0" :values="currentDate" styleType="button"
				activeColor="#11c53e"></uni-segmented-control>
		</view>
		<view class="select-menu">
			<view class="time">
				<view style="text-align: center;padding-bottom: 20rpx;">羽毛球</view>
				<view class="period-of-time">
					<view class="sometime" v-for="(item,index) in time" :key="index">
						{{item}}
					</view>
				</view>

			</view>
			<scroll-view class="select-venue" scroll-x>
				<view class="one-venue" v-for="(id,index1) in badmintonField.number" :key="index1">
					<view style="text-align: center;padding-bottom: 20rpx;">场地 {{index1+1}}</view>
					<view class="venues">
						<view class="venue-button" v-for="(price,index2) in badmintonField.price" :key="index2">
							<button class="mini-btn" type="primary" plain size="mini" hover-class="none"
								:disabled="badmintonField.state[index1][index2]"
								:class="{'active': badmintonField.selectedState[index1][index2]}"
								@click="changeSelectedState(index1,index2)">¥{{price}}</button>
						</view>
						<button class="delete" type="warn">删除</button>
					</view>

				</view>
			</scroll-view>

		</view>
		<view class="setting">点击左侧时间段设置价格，点击场地按钮设置场地状态</view>
		<view style="width: 100%;">
			<button class="add-venue" type="primary">新增场地</button>
		</view>
	</view>
</template>

<script setup>
	let date = new Date();
	let week = [" 周日 ", " 周一 ", " 周二 ", " 周三 ", " 周四 ", " 周五 ", " 周六 "]

	let getday = date.getDay();
	// 获取当天的日期
	let dayOfMonth = date.getDate();
	let tomorrowDayOfMonth = dayOfMonth + 1;
	// 获取当天的月份
	let month = date.getMonth() + 1; // 月份从0开始，需要加1
	// 获取明天星期
	let todayWeekday = week[getday];
	let tomorrmwWeekday = week[(getday + 1) % 7];
	let today = '今天  ' + todayWeekday + month + '月' + dayOfMonth + '日';
	let tomorrow = '明天  ' + tomorrmwWeekday + month + '月' + tomorrowDayOfMonth + '日';
	let currentDate = [today, tomorrow];
	const time = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00",
		"16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00"
	];
	let badmintonField = ref({
		price: [
			10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 25, 25, 25
		],
		number: 10,
		state: [
			[false, false, false, false, false, false, false, false, false, false, false, true, true],
			[false, false, false, false, false, false, false, false, false, false, false, false, true],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false]
		],
		selectedState: [
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false, false, false]
		]
	});

	function changeSelectedState(index1, index2) {
		badmintonField.value.selectedState[index1][index2] = !badmintonField.value.selectedState[index1][index2];
	}

	function changeState(index1, index2) {
		badmintonField.value.selectedState[index1][index2] = !badmintonField.value.selectedState[index1][index2];
	}
</script>

<style lang="scss">
	.venue-management {
		height: 1400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.venues-select {
			width: 100%;
		}

		.select-date {
			margin-top: 20rpx;
			width: 92%;
		}

		.select-menu {
			width: 100%;
			height: 83%;
			padding-top: 20rpx;
			background-color: #fff;
			display: flex;

			.time {
				height: 100%;
				padding-left: 4%;
				display: flex;
				flex-direction: column;
				flex-shrink: 0;
				// height: 1100rpx;

				.period-of-time {
					display: flex;
					flex-direction: column;

					.sometime {
						height: 80rpx;
						display: flex;
						align-items: center;
					}
				}
			}

			.select-venue {
				padding: 3%;
				padding-top: 0;
				white-space: nowrap;
				overflow: auto;

				.one-venue {
					width: 120rpx;
					height: 100%;
					padding: 10rpx;
					padding-top: 0;
					display: inline-block;

					.venues {
						height: 100%;
						display: flex;
						flex-direction: column;

						.venue-button {
							height: 80rpx;
							display: flex;
							align-items: center;

							.active {
								color: white;
								background-color: #11c53e;
							}

						}

						.delete {
							font-size: 22rpx;
						}

					}
				}
			}

		}

		.setting {
			margin-bottom: 30rpx;
		}

		.add-venue {
			background: #11c53e;
			width: 100%;
			border-radius: 0;
		}
	}
</style>