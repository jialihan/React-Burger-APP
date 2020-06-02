import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});
	it('should render two <navigationItem> if not authenticated', () => {
		// write expectations
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should render three <navigationItem> if is authenticated', () => {
		// option 1
		// wrapper = shallow(<NavigationItems isAuthenticated={true} />);
		// option 2: use enzyme package
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should exact render the logout NavLink if is authenticated', () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
	});
});
