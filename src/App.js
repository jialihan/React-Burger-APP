import React, { Component } from 'react';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from 'src/containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from 'src/containers/Orders/Orders';
import Auth from 'src/containers/Auth/Auth';
import Logout from 'src/containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from 'src/store/actions/index';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true
		};
	}
	componentDidMount() {
		/**
		 * For test componentWillUnmount: to delete this component
		 */
		// after 5 seconds, close the show
		// setTimeout(() => {
		// 	this.setState({ show: false });
		// }, 5000);
		this.props.onTryAutoSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/" component={BurgerBuilder} />
				{/* for anything unknown, redirects to root page */}
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticate) {
			routes = (
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="logout" componnet={Logout} />
					<Route path="/" component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>
					{/* <Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/auth" component={Auth} />
						<Route path="logout" componnet={Logout} />
						<Route path="/" component={BurgerBuilder} />
					</Switch> */}
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticate: state.auth.token !== null
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignIn: () => {
			dispatch(actionCreators.authCheckState());
		}
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
