class loginVerification {
	loginVerification(loginState, path) {
		if (loginState == false) {
			uni.showToast({
				title: '您还未登录！',
				duration: 1000,
				mask: true,
				success: () => {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login-registration/login/user-login',
						})
					}, 1000)
				}
			})
		} else {
			uni.navigateTo({
				url: path
			})
		}


	}
}
export default new loginVerification()