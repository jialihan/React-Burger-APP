import React from 'react';
import Logo from 'src/components/Logo/Logo';
import NavigationItems from 'src/components/Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from 'src/components/UI/Backdrop/Backdrop';
import Aux from 'src/hoc/Aux';
/**
 * used in Layout
 */

const SideDrawer = (props) => {
	// todo
	let attachedClasses = [ classes.SideDrawer, classes.Close ];
	if (props.open) {
		attachedClasses = [ classes.SideDrawer, classes.Open ];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			{/* <div className={classes.SideDrawer}> */}
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				{/* <Logo height="11%" />  another way to do it */}
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};
/**
 * change to stateful component
 */

export default SideDrawer;
