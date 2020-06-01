import React from 'react';
import classes from './Toolbar.css';
import Logo from 'src/components/Logo/Logo';
import NavigationItems from 'src/components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from 'src/components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</header>
	);
};

export default Toolbar;
