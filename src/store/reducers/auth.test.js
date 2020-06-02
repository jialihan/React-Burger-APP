import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};
describe('auth reducer', () => {
	it('should return the initial state ', () => {
		expect(authReducer(undefined, {})).toEqual(initialState);
	});
	it('should store the token upon login', () => {
		expect(
			authReducer(initialState, {
				type: actionTypes.AUTH_SUCCESS,
				idToken: 'test',
				userId: 'test'
			})
		).toEqual({
			token: 'test',
			userId: 'test',
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	});
});
