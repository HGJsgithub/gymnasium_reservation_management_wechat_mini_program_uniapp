class changeVenueState {
	changeVenueState(count, id1, id2, timeField1, timeField2, url, state) {
		const baseUrl = getApp().globalData.baseUrl
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: "POST",
				data: {
					count: count,
					id1: id1,
					id2: id2,
					timeField1: timeField1,
					timeField2: timeField2,
					state: state,
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				success: (res) => {
					resolve(res.data)
				},
				fail: (res) => {
					reject(res)
				}
			})
		})

	}
}
export default new changeVenueState()