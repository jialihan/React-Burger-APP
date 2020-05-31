import React, { Component } from 'react';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from 'src/containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from 'src/containers/Orders/Orders';

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
	}

	render() {
		return (
			<div>
				<Layout>
					{/* <p> Hello world!</p> */}
					{/* {this.state.show ? <BurgerBuilder /> : null} */}
					{/* <BurgerBuilder />
					<Checkout /> */}
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/orders" component={Orders} />
						<Route path="/" component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
