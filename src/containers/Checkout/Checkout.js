import React from 'react';
import CheckoutSummary from 'src/components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from 'src/containers/Checkout/ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Checkout(props) {
	// const [ ingredients, setIngredients ] = useState(() => {
	// 	let tmp = computeInitalStateBeforeRender(props);
	// 	return tmp[0];
	// });
	// const [ totalPrice, setTotalPrice ] = useState(() => {
	// 	let tmp = computeInitalStateBeforeRender(props);
	// 	return tmp[1].price;
	// });

	// console.log('has ingredients...', props);
	const checkoutCancelHander = () => {
		props.history.goBack();
	};
	const checkoutContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
	};
	let summary = <Redirect to="/" />;
	if (props.ingredients) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<div>
				{purchasedRedirect}
				<CheckoutSummary
					ingredients={props.ingredients}
					onCheckoutCancel={checkoutCancelHander}
					onCheckoutContinue={checkoutContinueHandler}
				/>
				<Route path={props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
	return summary;
}
const mapStateToProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
