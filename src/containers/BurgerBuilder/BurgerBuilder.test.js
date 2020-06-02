import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BurgerBuilder from './BurgerBuilder';
import BuildControls from '../../components/burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('Name of the group', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} ingredients={{ sala: 0 }} />);
	});
	it('should render <BuildControls /> when receive ingredient props', () => {
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
