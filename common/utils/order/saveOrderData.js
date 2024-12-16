class saveOrderData {
	saveOrderData(order, url) {
		const baseUrl = getApp().globalData.baseUrl
		uni.request({
			url: baseUrl + url,
			method: 'POST',
			data: order,
			header: {
				// "Content-Type": "application/x-www-form-urlencoded",
				"Content-Type": "application/json",
			},
			success: (res) => {
				console.log('res.data :>> ', res.data);
			},
			fail: (res) => {
				console.log('res :>> ', res);
			}
		})
	}
}
export default new saveOrderData()