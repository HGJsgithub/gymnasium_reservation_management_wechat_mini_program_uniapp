<template>
	<view class="index">
		<swiper class="swiperbanner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			indicator-active-color="#fff">
			<swiper-item>
				<image src="http://5b0988e595225.cdn.sohucs.com/images/20180202/5cbb0079f85147b88cb246a5213956a2.jpeg"
					mode="scaleToFill"></image>
			</swiper-item>
			<swiper-item>
				<image
					src="https://tse2-mm.cn.bing.net/th/id/OIP-C.yf-8oMFP9SP87IvzbMTU3wHaEK?w=291&h=181&c=7&r=0&o=5&pid=1.7"
					mode="scaleToFill"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://p0.ifengimg.com/a/2016/0818/d6b5ede1d3a7678size116_w893_h473.jpg" mode="scaleToFill">
				</image>
			</swiper-item>
			<swiper-item>
				<image src="http://fitimg.yunimg.cn/production/item/202008/261598406697-4866746284616542208.jpg"
					mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="quickEntryArea">
			<view class="option">
				<navigator url="/pages/reservation/badminton/badminton">
					<image src="../../static/quickEntry_icon/badminton.png"></image>
				</navigator>
				<view>羽毛球</view>
			</view>

			<view class="option">
				<navigator url="/pages/reservation/table-tennis/table-tennis">
					<image src="../../static/quickEntry_icon/tableTennis.png"></image>
				</navigator>
				<view>乒乓球</view>
			</view>
			<view class="option">
				<navigator url="/pages/reservation/tennis/tennis">
					<image src="../../static/quickEntry_icon/tennis.png"></image>
				</navigator>
				<view>网球</view>
			</view>
			<view class="option">
				<navigator url="/pages/reservation/basketball/basketball">
					<image src="../../static/quickEntry_icon/basketball.png"></image>
				</navigator>
				<view>篮球</view>
			</view>
			<view class="option">
				<navigator url="/pages/reservation/swimming/swimming">
					<image src="../../static/quickEntry_icon/swimming.png"></image>
				</navigator>
				<view>游泳</view>
			</view>
			<view class="option">
				<navigator url="/pages/reservation/body-building/body-building">
					<image src="../../static/quickEntry_icon/bodybuilding.png"></image>
				</navigator>
				<view>健身房</view>
			</view>
		</view>
		<announcement v-for="(item,index) in annList" :key="index" :ann="annList[index]"></announcement>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	const baseUrl = getApp().globalData.baseUrl
	const store = useStore()
	let annList = ref(store.state.announcement.annList)
	getApp().sayhi()
	onLoad(() => {
		async function get_Ann() {
			let recAnnList
			await uni.request({
				// url: "https://credible-halibut-sound.ngrok-free.app/announcement/get",
				url: baseUrl + "/announcement/get",
				header: {
					"ngrok-skip-browser-warning": "true"
				},
				success: (res) => {
					recAnnList = res.data
					store.commit('set_Ann_List', recAnnList)
				},
				fail: (err) => {
					uni.showToast({
						title: err.errMsg,
						icon: "error",
						duration: 1500
					})
				}
			})
		}
		if (annList.value.length == 0) {
			get_Ann()
			uni.reLaunch({
				url: "/pages/index/index"
			})
		}
	})
</script>

<style lang="scss">
	page {
		background-color: #f1f3f5;
	}

	.index {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.swiperbanner {
			width: 100%;
			height: 400rpx;

			image {
				width: 100%;
			}

		}

		.quickEntryArea {
			background-color: #ffffff;
			width: 90%;
			height: 450rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
			align-content: center;
			margin: 50rpx auto;

			border-radius: 20rpx;

			.option {
				width: 150rpx;
				height: 180rpx;
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;

				navigator {
					width: 120rpx;
					height: 120rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid #11c53e;
					border-radius: 30rpx;

					image {
						width: 100rpx;
						height: 100rpx;
					}
				}

				view {
					padding-top: 10rpx;
					text-align: center;
				}
			}


		}

		announcement {
			width: 90%;
		}
	}
</style>