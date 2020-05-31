import React, { useState, useEffect } from 'react';
import Order from 'src/components/Order/Order';
import axios from 'src/axios-orders';
import withErrorHandler from 'src/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from 'src/store/actions/index';
import Spinner from 'src/components/UI/Spinner/Spinner';

const Orders = (props) => {
	// const [ orders, setOrders ] = useState([]); // move to redux
	// const [ loading, setLoading ] = useState(true); // move to redux
	useEffect(() => {
		// fetch order data from server
		props.onFetchOrders();
		// axios
		// 	.get('/orders.json')
		// 	.then((res) => {
		// 		console.log('fetch orders data: ', res.data);
		// 		const fetchedOrders = [];
		// 		for (let key in res.data) {
		// 			fetchedOrders.push({ ...res.data[key], id: key });
		// 		}
		// 		setOrders(fetchedOrders);
		// 		setLoading(false); // turn off the spinner
		// 	})
		// 	.catch((err) => {
		// 		setLoading(false); // turn of the spinner
		// 	});
	}, []);
	let ords = <Spinner />;
	if (!props.loading) {
		ords = props.orders.map((order) => (
			<Order key={order.id} ingredients={order.ingredients} price={order.price} />
		));
	}
	return <div>{ords}</div>;
};
const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actionCreators.fetchOrders())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
