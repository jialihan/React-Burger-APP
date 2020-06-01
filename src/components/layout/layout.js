import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';
import Toolbar from 'src/components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'src/components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
/**
 * use this layour as a wrapper of core-content component we want to render to the screen
 * @param {} props 
 */

function Layout(props) {
	const [ showSideDrawer, setShowSideDrawer ] = useState(true);
	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};
	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};
	return (
		<Aux>
			<Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer isAuth={props.isAuthenticated} closed={sideDrawerClosedHandler} open={showSideDrawer} />
			<div>Toolbar, SideDrawer, BackDrop</div>
			<main className={classes.content}>{props.children}</main>
		</Aux>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(Layout);
