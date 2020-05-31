import { combineReducers } from 'redux';
import burgerReducer from './burgerReducer';
import orderReducer from './order';

const rootReducer = combineReducers({ burger: burgerReducer, order: orderReducer });

export default rootReducer;
