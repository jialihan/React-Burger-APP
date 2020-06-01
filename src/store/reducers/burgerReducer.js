import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/store/utility';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};
const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

/**
 * extract functions for each case in reducer
 */
const addIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] - 1
		},
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
};

const setIngredients = (state, action) => {
	return {
		...state,
		// ingredients: action.ingredients,
		ingredients: {
			// change the order of render burger image
			salad: action.ingredients.salad,
			cheese: action.ingredients.cheese,
			bacon: action.ingredients.bacon,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		error: false,
		building: false
	};
};

const fetchIngredients = (state, action) => {
	return updateObject(state, { error: true });
};

const burgerReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		// return {
		// 	...state,
		// 	ingredients: {
		// 		...state.ingredients,
		//
		// 	},
		// 	totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
		// };
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredients(state.action);
		// return {
		// 	...state,
		// 	error: true
		// };
	}
	return state;
};

export default burgerReducer;
