import React, { useState } from 'react';
import Button from 'src/components/UI/Button/Button';
import Input from 'src/components/UI/Input/input';
import classes from 'src/containers/Auth/Auth.css';
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
	return (
		<div className={classes.Auth}>
			<form>
				{form}
				<Button btnType="Success">Login</Button>
			</form>
		</div>
	);
};

export default Auth;
