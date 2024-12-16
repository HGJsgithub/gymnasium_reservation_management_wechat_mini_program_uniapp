class changeOrderState {
	changeOrderState(id, state, url) {
		const baseUrl = getApp().globalData.baseUrl
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'POST',
				data: {
					id: id,
					state: state
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
export default new changeOrderState()