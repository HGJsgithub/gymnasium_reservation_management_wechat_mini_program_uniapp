<template>
	<view style="width: 100%;" v-if="show1 && show2">
		<date-select @selectDate="selectDate"></date-select>
		<view class="select-menu">
			<view class="time-area">
				<view style="text-align: center;padding-bottom: 20rpx;">乒乓球</view>
				<view class="time-list">
					<view class="sometime" v-for="(time,index) in timeList" :key="index">
						{{time}}
					</view>
				</view>
			</view>
			<scroll-view class="select-venue" scroll-x>
				<view class="one-venue" v-for="(id,venue_id) in venueNum" :key="venue_id">
					<view style="text-align: center;padding-bottom: 20rpx;">场地 {{venue_id+1}}</view>
					<view class="button-list">
						<view class="one-button" v-for="(price,time) in priceList" :key="time">
							<button class="mini-btn" type="primary" plain size="mini" hover-class="none"
								:disabled="venueState[venue_id][time]"
								:class="{'active': selectedState[venue_id][time]}"
								@click="selected_Venue(venue_id,time)">
								¥{{price}}
							</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="tip">
			<view style="width: 400rpx;display: flex;justify-content: space-between;padding-bottom: 25rpx;">
				<button class="mini-btn" hover-class="none"
					style="width: 100rpx;height: 50rpx;font-size:20rpx;color: white;background-color: #11c53e;display: inline-block;">已选</button>
				<button class="mini-btn" type="primary" plain hover-class="none"
					style="width: 100rpx;height: 50rpx;font-size:20rpx;display: inline-block;">可选</button>
				<button class=" mini-btn" plain hover-class="none" disabled
					style="width: 100rpx;height: 50rpx;font-size:20rpx;display: inline-block;">已订</button>
			</view>
			<view>左右滑动屏幕选择更多场地</view>
		</view>
		<button class="placeOrderButton" type="primary" @click="go_To_Paid('乒乓球')">生成订单</button><!-- 要改 -->
	</view>

</template>
<script setup>
	import {
		useStore
	} from 'vuex'
	uni.showLoading({
		title: '加载中'
	});
	const baseUrl = getApp().globalData.baseUrl
	//用来判断是否从数据库获得今天的场地状态表
	let show1 = ref(false)
	//用来判断是否从数据库获得明天的场地状态表
	let show2 = ref(false)
	const ss = useStore().state
	const gd = getApp().globalData
	const loginState = uni.getStorageSync('loginState')
	let user = ref(uni.getStorageSync('userInfo'))
	let userID = String
	if (user.value != null) {
		userID = user.value.id
	}
	watch(user, (nv) => {
		if (nv != null) {
			userID = nv.value.id
		}
	}, {
		deep: true
	})
	let useDate = gd.todayFormattedDate.today_formattedDate()
	const reservationDate = gd.todayFormattedDate.today_formattedDate()
	// timeList: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00",
	// "15:00-16:00","16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00"]
	const timeList = ss.tableTennis.timeList //要改！
	// timeField: ["t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16", "t17", "t18", "t19", "t20", "t21"],
	const timeField = ss.tableTennis.timeField //要改！
	const timeNum = timeList.length
	const priceList = ss.tableTennis.priceList //要改！
	let venueState = ref([])
	let venueNum = ref(100)
	let venueState1 = ref([])
	let venueNum1 = ref(100)
	let venueState2 = ref([])
	let venueNum2 = ref(100)

	//获取今天的场地状态
	uni.request({
		url: baseUrl + "/venueInfo/venueState/tableTennis/getVenueState/today",
		header: {
			"ngrok-skip-browser-warning": "true",
		},
		success: (res) => {
			venueState.value = res.data
			venueNum.value = venueState.value.length
			venueState1.value = res.data
			venueNum1.value = venueState1.value.length
			uni.hideLoading();
			show1.value = true
		}
	})
	//获取明天的场地状态表
	uni.request({
		url: baseUrl + "/venueInfo/venueState/tableTennis/getVenueState/tomorrow",
		header: {
			"ngrok-skip-browser-warning": "true",
		},
		success: (res) => {
			venueState2.value = res.data
			venueNum2.value = venueState2.value.length
			uni.hideLoading();
			show2.value = true
		}
	})

	

	//场地选择状态表，用来记录被选择的场地
	let selectedState = ref([])
	for (let i = 0; i < venueNum.value; i++) {
		selectedState.value[i] = []
		for (let j = 0; j < timeNum; j++) {
			selectedState.value[i][j] = false
		}
	}
	let firstSelectedVenue = -1 //第一次选择的场地编号
	let secondSelectVenue = -1 //第二次选择的场地编号
	let count = 0 // 已经选择的场地数量


	//进入页面时，默认是今天的数据
	useDate = gd.todayFormattedDate.today_formattedDate()
	uni.setStorageSync('changeVenueStateUrl', '/venueInfo/venueState/tableTennis/checkAndChangeVenueState/today')

	//e代表选择的日期，0表示今天，1表示明天
	function selectDate(e) {
		selectedState.value = []
		for (let i = 0; i < venueNum.value; i++) {
			selectedState.value[i] = []
			for (let j = 0; j < timeNum; j++) {
				selectedState.value[i][j] = false
			}
		}
		firstSelectedVenue = -1
		secondSelectVenue = -1
		count = 0
		if (e == 0) {
			venueState.value = venueState1.value
			venueNum.value = venueNum1.value
			useDate = gd.todayFormattedDate.today_formattedDate()
			uni.setStorageSync('changeVenueStateUrl', '/venueInfo/venueState/tableTennis/checkAndChangeVenueState/today')
		}
		if (e == 1) {
			venueState.value = venueState2.value
			venueNum.value = venueNum2.value
			useDate = gd.tomorrowFormattedDate.tomorrow_formattedDate()
			uni.setStorageSync('changeVenueStateUrl',
				'/venueInfo/venueState/tableTennis/checkAndChangeVenueState/tomorrow')
		}
	}

	//用来改变被选择场地按钮的样式
	function selected_Venue(venue_id, time) {
		if (loginState == false) {
			uni.showToast({
				title: '您还未登录！',
				duration: 500,
				mask: true,
				success: () => {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login-registration/login/user-login',
						})
					}, 500)
				}
			})
			return
		}
		if (count == 0) { //0说明没有选择场地
			gd.changeSelectedState.changeSelectedState(selectedState.value, venue_id, time) //改变场地已选状态
			firstSelectedVenue = venue_id
		} else if (count == 1) { //1说明选择了一个场地
			if (firstSelectedVenue != venue_id) { //说明第二次选择的场地和第一次选择的不同
				gd.changeSelectedState.changeSelectedState(selectedState.value, venue_id, time)
				secondSelectVenue = venue_id
			} else { //说明这次选择的场地和第一次相同
				gd.changeSelectedState.changeSelectedState(selectedState.value, venue_id, time)
			}
		} else if (count == 2) { //说明已经选择了两个不同的场地
			if (venue_id == firstSelectedVenue || venue_id == secondSelectVenue) { //说明这次选择的场地是之前选择的两个之一，也就是不同的时间段
				gd.changeSelectedState.changeSelectedState(selectedState.value, venue_id, time)
			} else { //说明选择了第三个不同的场地
				uni.showToast({
					title: '一次只能预订两个不同的场地！',
					icon: 'none'
				})
			}

		}
		count = 0
		//计算已经选择的场地数量
		for (let i = 0; i < venueNum.value; i++) {
			for (let j = 0; j < timeNum; j++) {
				if (selectedState.value[i][j] == true) {
					count++
					break
				}

			}
		}
	}

	function go_To_Paid(venueType) {
		//检查是否还有未支付的订单
		let orderInfo = uni.getStorageSync("orderInfo")
		if (orderInfo != null && orderInfo.state == 0) {
			uni.showToast({
				title: '还有未支付的订单！',
				icon: 'none'
			})
			return
		}
		if (count == 1 || count == 2) {
			let timestamp = new Date().getTime()
			//选择的第一个场地的各个时间段
			let time1 = []
			//第一个场地各个时间段的在数组的索引
			let timeField1 = []
			let price1 = 0
			//finishTime1记录第一个场地最晚完成的订单时间
			let finishTime1
			for (let i = 0; i < timeNum; i++) {
				if (selectedState.value[firstSelectedVenue][i] == true) {
					timeField1.push(timeField[i])
					time1.push(timeList[i])
					price1 = price1 + priceList[i]
					finishTime1 = i + 9
				}
			}
			uni.setStorageSync('timeField1', timeField1)
			//创建第一个场地的订单细节
			let venue1 = gd.createOrderDetail.create_Order_Detail(firstSelectedVenue, time1, price1)
			if (count == 1) {
				//由于只选了一个场地，因此创建一个空的第二个场地订单细节方便统一
				let venue2 = gd.createOrderDetail.create_Order_Detail(null, null, null)
				//finishTime记录最终完成的时间，由于只有一个场地因此finishTime=finishTime1
				let finishTime = finishTime1
				let orderInfo = gd.createOrder.create_Order(timestamp, userID, '待支付', venueType, count, reservationDate,
					useDate, finishTime, venue1, venue2, false)
				uni.setStorageSync('orderInfo', orderInfo)
				uni.redirectTo({
					url: '/pages/order/to-be-paid',
				})
			}
			if (count == 2) {
				//选择的第二个场地的各个时间段
				let time2 = []
				//第二个场地各个时间段的在数组的索引
				let timeField2 = []
				let price2 = 0
				//finishTime2记录第二个场地最晚完成的订单时间
				let finishTime2
				for (let i = 0; i < timeNum; i++) {
					if (selectedState.value[secondSelectVenue][i] == true) {
						timeField2.push(timeField[i])
						time2.push(timeList[i])
						price2 = price2 + priceList[i]
						finishTime2 = i + 9
					}
				}
				uni.setStorageSync('timeField2', timeField2)
				//finishTime记录最终完成的时间
				let finishTime = finishTime1 > finishTime2 ? finishTime1 : finishTime2
				//创建第二个场地的订单细节
				let venue2 = gd.createOrderDetail.create_Order_Detail(secondSelectVenue, time2, price2)
				let orderInfo = gd.createOrder.create_Order(timestamp, userID, '待支付', venueType, count, reservationDate,
					useDate, finishTime, venue1, venue2, false)
				uni.setStorageSync('orderInfo', orderInfo)
				uni.redirectTo({
					url: '/pages/order/to-be-paid',
				})
			}

		}
	}
</script>

<style lang="scss">
	.select-menu {
		display: flex;

		.time-area {
			padding-left: 4%;
			display: flex;
			flex-direction: column;
			flex-shrink: 0;

			.time-list {
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

				padding: 10rpx;
				padding-top: 0;
				display: inline-block;

				.button-list {
					display: flex;
					flex-direction: column;

					.one-button {
						height: 80rpx;
						display: flex;
						align-items: center;

						.active {
							color: white;
							background-color: #11c53e;
						}

					}
				}
			}
		}

	}

	.tip {
		height: 145rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;

	}

	.placeOrderButton {
		position: fixed;
		width: 100%;
		bottom: 0;
		border-radius: 0rpx;
	}
</style>