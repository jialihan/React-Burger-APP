import React, { useEffect } from 'react';
import classes from './burger.css';
import BurgerIngredient from './BurgerIngredient/burgerIngredient';
import { withRouter } from 'react-router-dom';

function Burger(props) {
	// useEffect(() => {
	// 	console.log('burger props:', props);
	// }, []);
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			// js function
			//console.log('burger before render()... props: ', props.ingredients);
			return [ ...Array(props.ingredients[igKey]) ].map((_, index) => {
				return <BurgerIngredient key={igKey + index} type={igKey} />;
			}); // [meat, meat] if meat:2
		})
		.reduce((arr, el) => {
			return arr.concat(el); // flat the array
		}, []);
	// check ingrendients empty or not
	console.log(transformedIngredients);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{/* <BurgerIngredient type="cheese" />
			<BurgerIngredient type="meat" /> */}
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default withRouter(Burger);
