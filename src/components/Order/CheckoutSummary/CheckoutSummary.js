import React from 'react';
import Burger from 'src/components/burger/burger';
import Button from 'src/components/UI/Button/Button';
import classes from './CheckoutSummary.css';
/**
 * Display a preview of burger
 * conitnue/canel button
 */
const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>we hope it tastes well!</h1>
			{/* not really centered because of the w&h 300px */}
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked={props.onCheckoutCancel}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.onCheckoutContinue}>
				CONITNUE
			</Button>
		</div>
	);
};

export default CheckoutSummary;
