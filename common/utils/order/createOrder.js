class createOrder {
	create_Order(id, userID, state, venueType, count, reservationDate, useDate, finishTime, venue1, venue2,
	cancelFlag) {
		let order = new Object();
		order.id = id
		order.userID = userID
		order.state = state
		order.venueType = venueType
		order.count = count
		order.reservationDate = reservationDate
		order.useDate = useDate
		order.finishTime = finishTime
		order.venue1 = venue1
		order.venue2 = venue2
		order.cancelFlag = cancelFlag
		return order;
	}
}


export default new createOrder()