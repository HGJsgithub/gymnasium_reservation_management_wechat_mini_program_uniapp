<template>
	<view class="selectDate">
		<uni-segmented-control :current=0 :values="date" @clickItem="handleSelectDate" styleType="button"
			activeColor="#11c53e"></uni-segmented-control>
	</view>

</template>

<script setup>
	const gd = getApp().globalData
	const date = gd.selectDate.selectDate()
	const emit = defineEmits(["selectDate"])

	function handleSelectDate(e) {
		emit("selectDate", e.currentIndex)
		console.log('e.currentIndex',e.currentIndex)
	}
</script>

<style lang="scss">
	.selectDate {
		padding: 4%;
	}
</style>