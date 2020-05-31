import React from 'react';
import burgerLogo from 'src/assets/images/burger-logo.png';
import classes from './Logo.css';
const Logo = (props) => {
	return (
		<div className={classes.Logo} style={{ height: props.height }}>
			{/* <img src="../../assets/images/burger-logo.png" /> */}
			<img src={burgerLogo} alt="MyBurger" />
		</div>
	);
};

export default Logo;
