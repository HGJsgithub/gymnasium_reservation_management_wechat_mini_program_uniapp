class checkPassword {
	check_Password(pwdLength) { //判断密码是否小于6位，正常返回true
		if (pwdLength < 6) {
			return false
		} else {
			return true
		}
	}
}


export default new checkPassword()