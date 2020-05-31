import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import rootReducer from 'src/store/reducers/burgerReducer';
import thunk from 'redux-thunk';
import rootReducer from 'src/store/reducers/index';

// const logger = (store) => {
// 	return (next) => {
// 		return (action) => {
// 			// todo
// 			console.log('[Middleware] dispatching', action);
// 			const result = next(action); // to do
// 			console.log('[Middleware] next state', store.getState()); // we have access to store now
// 			console.log('[Middleware] next result', result);
// 			return result;
// 		};
// 	};
// };

// use redux devtool extension: advanced setup with middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))); // can also add a list of middleware

// // basic store devtool redux exte sion
// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * ADD THE ROUTER
 */
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
