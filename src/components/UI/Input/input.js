import React from 'react';
import classes from './input.css';

// const input = (props) => {
// 	let inputElement = null;
// 	switch (props.inputtype) {
// 		case 'input':
// 			inputElement = <input className={classes.InputElement} {...props} />;
// 			break;
// 		case 'textarea':
// 			inputElement = <textarea className={classes.InputElement} {...props} />;
// 			break;
// 		default:
// 			inputElement = <input className={classes.InputElement} {...props} />;
// 	}
// 	return (
// 		<div className={classes.Input}>
// 			<label className={classes.Label}>{props.label}</label>
// 			{inputElement}
// 		</div>
// 	);
// };

const input = (props) => {
	let inputElement = null;
	const inputClasses = [ classes.InputElement ];
	// console.log('should vlaid for ', props.shouldValidate);
	console.log('user touched', props.touched);
	if (props.shouldValidate && props.invalid && props.touched) {
		inputClasses.push(classes.Invalid);
	}
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
					<option value="" />
					{props.elementConfig.options.map((el) => (
						<option key={el.value} value={el.value}>
							{el.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;
