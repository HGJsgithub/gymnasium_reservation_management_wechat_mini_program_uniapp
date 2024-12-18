<script>
	import changeSelectedState from './common/utils/changeSelectedState/changeSelectedState.js';
	import checkPhone from './common/utils/checkPhoneAndPassword/checkPhone.js';
	import checkPassword from './common/utils/checkPhoneAndPassword/checkPassword.js';
	import createOrder from './common/utils/order/createOrder.js';
	import createOrderDetail from './common/utils/order/createOrderDetail.js';
	import loginVerification from './common/utils/loginVerification/loginVerification.js';

	import todayFormattedDate from './common/utils/formattedDate/todayFormattedDate.js';
	import tomorrowFormattedDate from './common/utils/formattedDate/tomorrowFormattedDate.js';
	import selectDate from './common/utils/formattedDate/selectDate.js';
	import changeVenueState from './common/utils/venueInfo/changeVenueState.js';
	import changeOrderState from './common/utils/order/changeOrderState.js';
	import saveOrderData from './common/utils/order/saveOrderData.js';
	import changeCancelFlag from './common/utils/order/changeCancelFlag.js';
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {},
		globalData: {
			// baseUrl: "http://192.168.3.5:8080",
			baseUrl:"https://credible-halibut-sound.ngrok-free.app",
			// baseUrl: "http://[2409:8a55:1e10:f6b4:3231:1703:c48c:b4cc]:8080",
			changeSelectedState,
			checkPhone,
			checkPassword,

			createOrder,
			createOrderDetail,
			changeVenueState,
			changeOrderState,
			changeCancelFlag,
			saveOrderData,

			loginVerification,

			todayFormattedDate,
			tomorrowFormattedDate,
			selectDate,
		},
		methods: {
			sayhi() {
				console.log("hi");
			}
		}
	}
</script>


<style>
	/*每个页面公共css */
</style>