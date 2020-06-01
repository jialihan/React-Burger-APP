import React, { useState, useEffect } from 'react';
import Button from 'src/components/UI/Button/Button';
import Input from 'src/components/UI/Input/input';
import classes from 'src/containers/Auth/Auth.css';
import * as actionCreators from 'src/store/actions/index';
import { connect } from 'react-redux';
import Spinner from 'src/components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const checkValidation = (value, rules) => {
	let isValid = true;
	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	}

	return isValid;
};

const Auth = (props) => {
	useEffect(() => {
		if (!props.buildingBurger && props.authRedirectPath != '/') {
			props.onSetAuthRedirectPath('/');
		}
	}, []);
	const [ signUp, setSignUp ] = useState(false); // need to sign up first
	const [ authForm, setAuthForm ] = useState(() => {
		const initialForm = {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		};
		return initialForm;
	});
	const fromElementsArray = [];
	for (let key in authForm) {
		fromElementsArray.push({
			id: key,
			config: authForm[key]
		});
	}
	let form = fromElementsArray.map((el) => {
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
	});
	const inputChangedHandler = (event, inputIdentifier) => {
		// console.log(event.target.value);
		const updatedControls = {
			...authForm,
			[inputIdentifier]: {
				...authForm[inputIdentifier],
				value: event.target.value,
				valid: checkValidation(event.target.value, authForm[inputIdentifier].validation),
				touched: true
			}
		};
		setAuthForm(updatedControls);
	};
	const submitHandler = (event) => {
		event.preventDefault();
		// TODO:
		// check is all local validation is true, then send request
		props.onAuth(authForm.email.value, authForm.password.value, !signUp);
	};
	const switchAuthModeHandler = () => {
		setSignUp(!signUp);
	};
	if (props.loading) {
		form = <Spinner />;
	}
	// handle error when submit
	let errorMessage = null;
	if (props.error) {
		// TODO: add styling
		// this message is from firebase response message
		errorMessage = <p>Error: {props.error.message} !</p>;
	}
	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}
	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success">{signUp ? 'Sign In' : 'Sign Up'}</Button>
			</form>
			<Button btnType="Danger" clicked={switchAuthModeHandler}>
				Switch to {signUp ? 'Sign Up' : 'Sign In'}
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath,
		buildingBurger: state.burger.building
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, signUp) => dispatch(actionCreators.auth(email, password, signUp)),
		onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
