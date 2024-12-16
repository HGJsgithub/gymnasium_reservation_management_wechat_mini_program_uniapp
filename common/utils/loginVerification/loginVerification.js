class loginVerification {
	loginVerification(loginState, path, direct) {
		if (direct == true) {
			uni.navigateTo({
				url: '/pages/login-registration/login/user-login',
			})
		} else {
			if (loginState == false) {
				uni.showToast({
					title: '您还未登录！',
					duration: 750,
					mask: true,
					success: () => {
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login-registration/login/user-login',
							})
						}, 750)
					}
				})
			} else {
				uni.navigateTo({
					url: path
				})
			}
		}

	}
}
export default new loginVerification()