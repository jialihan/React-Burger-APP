import * as actionTypes from 'src/store/actions/actionTypes';
import axios from 'src/axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

// async call to submit order data to server
export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		purchaseBurgerStart();
		axios
			.post('/orders.json?auth=' + token, orderData)
			.then((resp) => {
				console.log('order resp:', resp.data);
				dispatch(purchaseBurgerSuccess(resp.data.name, orderData));
				// setLoading(false);// close spinner & close the modal
				// props.history.push('/');
			})
			.catch((err) => {
				console.log(err);
				dispatch(purchaseBurgerFail(err));
				// setLoading(false);// close spinner & close the modals
				//this.setState({ loading: false, purchasing: false });
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrderSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrderFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

// async call to fetch order data from server
// add atuthentiation
export const fetchOrders = (token, userId) => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get('/orders.json' + queryParams)
			.then((res) => {
				console.log('fetch orders data: ', res.data);
				// transform data
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				dispatch(fetchOrderSuccess(fetchedOrders));
			})
			.catch((err) => {
				dispatch(fetchOrderFail(err));
			});
	};
};
