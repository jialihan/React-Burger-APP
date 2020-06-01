import React, { useEffect, useState } from 'react';
import classes from './Modal.css';
import Aux from 'src/hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
function Modal(props) {
	const [ shouldComponentUpdate, setShouldComponentUpdate ] = useState(false);

	//In this case, we only want to set use-dark-mode once the enabled value changes, and not on every change which happens in the component.
	// In this example, any changes happening to otherItemsInComponent, won't invoke the below effect. It will only trigger once the value of enabled is changed.
	useEffect(
		function() {
			setShouldComponentUpdate(true);
			//console.log('modal component should update...');
		},
		[ props.show, props.children ]
	);

	return shouldComponentUpdate ? (
		<Aux>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}
			>
				{props.children}
			</div>
		</Aux>
	) : null;
}

export default Modal;
