export default {
	state: {
		userList: uni.getStorageSync("userList") ? uni.getStorageSync("userList") : []
	},
	getters: {

	},
	mutations: {
		set_User_List(state, userList) {
			state.userList = userList
			uni.setStorageSync("userList", state.userList)
		},
		delete_User(state, index) {
			uni.request({
				url: "http://192.168.1.106:8080/users/delete",
				method: "POST",
				data: {
					phone: state.userList[index].phone
				},
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					console.log(res.data.msg);
				}
			})
			state.userList.splice(index, 1)
			uni.setStorageSync("userList", state.userList)
		},
		delete_User_List() {
			uni.removeStorageSync("userList")
		}
	},
	actions: {

	}
}