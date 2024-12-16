class changeCancelFlag {
	changeCancelFlag(id, state, url) {
		const baseUrl = getApp().globalData.baseUrl
		uni.request({
			url: baseUrl + url,
			method: 'POST',
			data: {
				id: id,
				state: state
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
			}
		})
	}
}
export default new changeCancelFlag()