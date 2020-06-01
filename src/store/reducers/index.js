import { combineReducers } from 'redux';
import burgerReducer from './burgerReducer';
import orderReducer from './order';
import authReducer from './auth';

const rootReducer = combineReducers({ burger: burgerReducer, order: orderReducer, auth: authReducer });

export default rootReducer;
