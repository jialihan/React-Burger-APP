import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';
import Toolbar from 'src/components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'src/components/Navigation/SideDrawer/SideDrawer';
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
			<Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
			<div>Toolbar, SideDrawer, BackDrop</div>
			<main className={classes.content}>{props.children}</main>
		</Aux>
	);
}

export default Layout;
