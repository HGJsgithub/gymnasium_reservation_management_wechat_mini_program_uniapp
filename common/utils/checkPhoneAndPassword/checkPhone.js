class checkPhone {
	check_Phone(phone) { //判断手机号是否有误，正常返回true
		var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!reg.test(phone)) {
			return false;
		} else {
			return true;
		}
	}
}


export default new checkPhone()