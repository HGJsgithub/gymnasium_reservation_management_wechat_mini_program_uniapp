import {
	createStore
} from "vuex"
import announcement from "./modules/announcement"

//场地信息
import badminton from "./modules/venues/badminton"
import tableTennis from "./modules/venues/tableTennis"
import tennis from "./modules/venues/tennis"

import date from "./modules/date"


import users from "./modules/all-users/users"

//订单
import afterSalesOrderList from "./modules/orders/afterSalesOrderList"
import canceledOrderList from "./modules/orders/canceledOrderList"
import toBeUseOrderList from "./modules/orders/toBeUseOrderList.js"


const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		announcement,
		//场地信息
		badminton,
		tableTennis,
		tennis,

		date,
		users,
		//订单
		afterSalesOrderList,
		canceledOrderList,
		toBeUseOrderList,

	}
});
export default store;