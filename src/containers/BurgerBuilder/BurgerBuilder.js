import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'src/axios-orders';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';
import Modal from 'src/components/UI/Modal/Modal';
import OrderSummary from 'src/components/burger/OrderSummary/OrderSummary';
import Spinner from 'src/components/UI/Spinner/Spinner';
import withErrorHandler from 'src/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from 'src/store/actions/index';

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasable: false, // disable our order button
			purchasing: false, // order now button is clicked or not
			loading: false, // to show a spinner or not
			error: null // to show an error or not
		};
		this.addIngredientHandler = this.addIngredientHandler.bind(this);
		this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
		this.updatePurchaseStatus = this.updatePurchaseStatus.bind(this);
		this.purchaseOrderHandler = this.purchaseOrderHandler.bind(this);
		this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
		this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
	}

	componentDidMount() {
		console.log('Burgurbuilder props:', this.props);
		// get ingrdients from server using dispatching actions
		if (this.props.ingrdients) {
			return;
		}
		this.props.onInitIngredients();
	}

	purchaseContinueHandler() {
		console.log('conitnue purchse order......');
		this.props.onInitPurchase(); // set purchased to false
		// const queryParams = [];
		// for (let i in this.props.ingredients) {
		// 	if (this.props.ingredients[i] > 0) {
		// 		queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
		// 	}
		// }
		// // also pass totalprice to the checkout
		// queryParams.push('price=' + this.props.totalPrice);
		// const queryString = queryParams.join('&');
		// this.props.history.push({
		// 	pathname: '/checkout',
		// 	search: '?' + queryString
		// });
		this.props.history.push('/checkout');
	}

	purchaseCancelHandler() {
		console.log('orderSummary modal closed');
		this.setState({
			purchasing: false
		});
	}
	purchaseOrderHandler() {
		console.log('Order button clicked');
		if (this.props.isAuthenticate) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}
	updatePurchaseStatus(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey]; // TO get array of values of each item
			})
			.reduce((newsum, el) => {
				return newsum + el;
			}, 0);
		// console.log('cur sum ingdt units: ', sum);
		return sum > 0;
	}
	addIngredientHandler = (type) => {
		// const oldCnt = this.props.ingredients[type];
		// const newCnt = oldCnt + 1;
		// const updatedIngredients = {
		// 	...this.props.ingredients
		// };
		// updatedIngredients[type] = newCnt;
		// // update price
		// const additionPrice = INGREDIENT_PRICES[type];
		// const oldPrice = this.props.totalPrice;
		// const newPrice = oldPrice + additionPrice;
		// this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		// this.updatePurchaseStatus(updatedIngredients);
	};
	removeIngredientHandler = (type) => {
		const oldCnt = this.props.ingredients[type];
		if (oldCnt <= 0) {
			return;
		}
	};
	/**
     * what we want to render
     */
	render() {
		const disabledInfo = {
			...this.props.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
		}
		let orderSummary = null;
		// add spinner to load burger when fetch data from server
		let burger = this.state.error ? <p>Ingrdients cannot be loaded!</p> : <Spinner />;
		if (this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.onAddIngredient}
						ingredientRemoved={this.props.onDeleteIngredient}
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchasable={this.updatePurchaseStatus(this.props.ingredients)}
						ordered={this.purchaseOrderHandler}
						isAuth={this.props.isAuthenticate}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.props.ingredients}
					price={this.props.totalPrice}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice,
		error: state.burger.error,
		isAuthenticate: state.auth.token !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onAddIngredient: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
		// onDeleteIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
		onDeleteIngredient: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actionCreators.initIngredients()),
		onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
