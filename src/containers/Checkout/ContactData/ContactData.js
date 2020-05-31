import React, { useState } from 'react';
import Button from 'src/components/UI/Button/Button';
import classes from 'src/containers/Checkout/ContactData/ContactData.css';
import axios from 'src/axios-orders';
import Spinner from 'src/components/UI/Spinner/Spinner';
import Input from 'src/components/UI/Input/input';
import { connect } from 'react-redux';
import withErrorHandler from 'src/hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from 'src/store/actions/index';

const ContactData = (props) => {
	// local UI state for the form data
	const [ orderForm, setOrderForm ] = useState(() => {
		const initialForm = {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'zip code'
				},
				value: '',
				validation: {
					required: true,
					minLen: 5,
					maxLen: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input', // or use a dropdown later
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-mail'
				},
				value: '',
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: '',
				touched: false,
				valid: false,
				validation: {
					required: true
				}
			}
		};
		return initialForm;
	});
	const [ formIsValid, setformIsValid ] = useState(false);
	// const [ loading, setLoading ] = useState(false); // in redux now
	const checkValidation = (value, rules) => {
		if (rules.required) {
			if (value.trim() === '') return false;
		}
		if (rules.minLen) {
			if (value.length < rules.minLen) return false;
		}
		if (rules.maxLen) {
			if (value.length > rules.maxLen) return false;
		}
		return true;
	};
	const orderHandler = (event) => {
		event.preventDefault();
		// alert('conitnue purchse order......');
		// setLoading(true); // handle loading in redux
		// console.log('order data props:', props);
		const formData = {};
		for (let id in orderForm) {
			formData[id] = orderForm[id].value;
		}
		const order = {
			ingredients: props.ingredients,
			price: props.price,
			orderData: formData
		};
		props.onOrderBurger(order);
		// Todo: send data to my backend
		// begin to use dispatching actions
		// axios
		// 	.post('/orders.json', order)
		// 	.then((resp) => {
		// 		// close spinner & close the modal
		// 		setLoading(false);
		// 		// no purchasing state in this compoonent any more
		// 		// this.setState({ loading: false, purchasing: false });
		// 		props.history.push('/');
		// 		console.log(resp);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		// close spinner & close the modals
		// 		setLoading(false);
		// 		//this.setState({ loading: false, purchasing: false });
		// 	});
	};
	const inputChangedHandler = (event, inputIdentifier) => {
		console.log(event.target.value); // for test at first
		const updatedOrderForm = { ...orderForm };
		updatedOrderForm[inputIdentifier].value = event.target.value;
		updatedOrderForm[inputIdentifier].touched = true;
		// if should validate
		if (updatedOrderForm[inputIdentifier].validation) {
			updatedOrderForm[inputIdentifier].valid = checkValidation(
				updatedOrderForm[inputIdentifier].value,
				updatedOrderForm[inputIdentifier].validation
			);
		}
		// check all id is valid or not
		let check = true;
		for (let id in updatedOrderForm) {
			if (updatedOrderForm[id].validation) {
				check = updatedOrderForm[id].valid && check;
			}
		}
		setformIsValid(check);
		console.log('form valid: ', formIsValid);
		setOrderForm(updatedOrderForm);
	};
	const fromElementsArray = [];
	for (let key in orderForm) {
		fromElementsArray.push({
			id: key,
			config: orderForm[key]
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{/* <Input inputtype="input" type="text" name="name" placeholder="Your name" /> */}
			{fromElementsArray.map((el) => {
				return (
					<Input
						key={el.id}
						elementType={el.config.elementType}
						elementConfig={el.config.elementConfig}
						value={el.config.value}
						invalid={!el.config.valid}
						shouldValidate={el.config.validation}
						touched={el.config.touched}
						changed={(event) => inputChangedHandler(event, el.id)}
					/>
				);
			})}
			<Button btnType="Success" disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	);
	if (props.loading) form = <Spinner />;

	return (
		<div className={classes.ContactData}>
			<h4>Please enter your Contact Data: </h4>
			{form}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
		price: state.burger.totalPrice,
		loading: state.order.loading
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
