class selectDate {
	selectDate() {
		const date = new Date();
		const week = [" 周日 ", " 周一 ", " 周二 ", " 周三 ", " 周四 ", " 周五 ", " 周六 "]

		const getday = date.getDay()
		const dayOfMonth = date.getDate() // 获取当天的日期
		let tomorrowDayOfMonth = dayOfMonth + 1
		let month = date.getMonth() + 1 // 获取当天的月份月份从0开始，需要加1
		let todayWeekday = week[getday] // 获取明天星期
		let tomorrowWeekday = week[(getday + 1) % 7]
		let today = '今天  ' + todayWeekday + month + '月' + dayOfMonth + '日'
		let tomorrow = '明天  ' + tomorrowWeekday + month + '月' + tomorrowDayOfMonth + '日'
		let currentDate = [today, tomorrow]
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
			if (dayOfMonth == 31) {
				if (month == 12) {
					tomorrow = '明天  ' + tomorrowWeekday + 1 + '月' + 1 + '日'
					return [today, tomorrow]
				}
				month++
				tomorrow = '明天  ' + tomorrowWeekday + month + '月' + 1 + '日'
				return [today, tomorrow]
			}
		}
		if (month == 2) {
			//如果今年是闰年且今天是29日
			if ((month % 4 == 0 && month % 100 != 0) || (month % 400 == 0)) {
				if (dayOfMonth == 29) {
					//则明天是3月1日
					tomorrow = '明天  ' + tomorrowWeekday + 3 + '月' + 1 + '日'
					return [today, tomorrow]
				}
			} else {
				//如果是平年且今天是28日
				if (dayOfMonth == 28) {
					// 则明天是3月1日
					tomorrow = '明天  ' + tomorrowWeekday + 3 + '月' + 1 + '日'
					return [today, tomorrow]
				}
			}
		}
		if (month == 4 || month == 6 || month == 9 || month == 11) {
			if (dayOfMonth == 30) {
				month++
				tomorrow = '明天  ' + tomorrowWeekday + month + '月' + 1 + '日'
				return [today, tomorrow]
			}
		}
		return currentDate

	}
}

export default new selectDate()