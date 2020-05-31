import * as actionTypes from 'src/store/actions/actionTypes';
import axios from 'src/axios-orders';

// onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),

// action creators
export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

// onDeleteIngredient: (ingName) => dispatch({ type: actionTypes.DEL_INGREDIENT, ingredientName: ingName })
export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};
export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

// sync creator
export const setIngredient = (ing) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ing
	};
};

// async creator
export const initIngredients = () => {
	// thunk middleware let us to do so
	return (dispatch) => {
		// get ingrdients from server
		axios
			.get('https://jelly-burger.firebaseio.com/ingredients.json')
			.then((resp) => {
				// dispatch to be created actions to update ingredients in redux
				dispatch(setIngredient(resp.data));
			})
			.catch((err) => {
				console.log(err);
				// this.setState({ error: true });
				dispatch(fetchIngredientsFailed());
			});
	};
};
