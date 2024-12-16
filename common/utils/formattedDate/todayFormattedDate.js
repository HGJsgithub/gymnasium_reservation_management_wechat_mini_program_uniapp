class todayFormattedDate {
	today_formattedDate() {
		let currentDate = new Date();
		// 格式化日期为 "YYYY-MM-DD" 形式
		let year = currentDate.getFullYear();
		let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始，需要加 1，并补齐两位
		let day = currentDate.getDate().toString().padStart(2, '0'); // 补齐两位
		let formattedDate = `${year}-${month}-${day}`;
		return formattedDate
	}
}
export default new todayFormattedDate()