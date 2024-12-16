class createOrderDetail {
	create_Order_Detail(number, time, price) {
		let o = new Object();
		o.number = number
		o.time = time
		o.price = price
		return o;
	}
}


export default new createOrderDetail()