export default {
	state: {
		annList: uni.getStorageSync("announcement") ? uni.getStorageSync("announcement") : []
	},
	getters: {

	},
	mutations: {
		set_Ann_List(state, annList) {
			state.annList = annList
			uni.setStorageSync("announcement", state.annList)
		},
		delete_Ann(state, index) {
			uni.request({
				url: "http://192.168.1.106:8080/announcement/delete",
				method: "POST",
				data: {
					id: state.annList[index].id
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					console.log(res.data.msg);
				}
			})
			state.annList.splice(index, 1)
			uni.setStorageSync("announcement", state.annList)
		}
	},
	actions: {

	}
}