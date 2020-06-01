// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import * as actionCreators from 'src/store/actions/index';
// import { Redirect } from 'react-router-dom';
// const Logout = (props) => {
// 	useEffect(() => {
// 		// dispatch this logout action
// 		console.log('logout componentDidMount.....');
// 		props.onLogout();
// 	}, []);
// 	return <div>{props.isLogout ? <Redirect to="/" /> : null}</div>;
// };
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onLogout: () => dispatch(actionCreators.logOut())
// 	};
// };
// const mapStateToProps = (state) => {
// 	return {
// 		isLogout: state.auth.token === null
// 	};
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Logout);

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from 'src/store/actions/index';

class Logout extends Component {
	componentWillMount() {
		console.log('logout willMount.....');
		this.props.onLogout();
	}

	render() {
		return <Redirect to="/" />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actionCreators.logout())
	};
};

export default connect(null, mapDispatchToProps)(Logout);
