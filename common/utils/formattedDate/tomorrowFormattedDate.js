class tomorrowFormattedDate {
	tomorrow_formattedDate() {
		const currentDate = new Date();
		// 格式化日期为 "YYYY-MM-DD" 形式
		const year = currentDate.getFullYear();
		//获取到的数字类型的月份
		const numberMonth = currentDate.getMonth() + 1
		//获取到的数字类型的日期
		const numberDay = currentDate.getDate()
		//一个月有31日的情况
		if (numberMonth == 1 || numberMonth == 3 || numberMonth == 5 || numberMonth == 7 || numberMonth == 8 ||
			numberMonth == 10 || numberMonth == 12) {
			//如果是31日
			if (numberDay == 31) {
				//如果是12月31日，则明天是明年的1月1日
				if (numberMonth == 12) {
					return `${year+1}-01-01`
				}
				const formattedMonth = (numberMonth + 1).toString().padStart(2, '0')
				//明天是下个月的1日
				return `${year}-${formattedMonth}-01`
			}
		}
		//如果这个月是2月
		if (numberMonth == 2) {
			//如果是闰年且今天是29日
			if ((numberMonth % 4 == 0 && numberMonth % 100 != 0) || (numberMonth % 400 == 0)) {
				if (numberDay == 29) {
					//则明天是3月1日
					return `${year}-03-01`
				}
			} else {
				//如果是平年且今天是28日
				if (numberDay == 28) {
					// 则明天是3月1日
					return `${year}-02-28`
				}
			}
		}
		//一个月只有30天的情况
		if (numberMonth == 4 || numberMonth == 6 || numberMonth == 9 || numberMonth == 11) {
			//且今天是30日
			if (numberDay == 30) {
				const formattedMonth = (numberMonth + 1).toString().padStart(2, '0')
				//明天是下个月的1日
				return `${year}-${formattedMonth}-01`
			}
		}
		//常规日期
		const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0') // 月份从 0 开始，需要加 1，并补齐两位
		const formattedDay = (currentDate.getDate() + 1).toString().padStart(2, '0') // 补齐两位
		const formattedDate = `${year}-${formattedMonth}-${formattedDay}`
		return formattedDate
	}
}
export default new tomorrowFormattedDate()