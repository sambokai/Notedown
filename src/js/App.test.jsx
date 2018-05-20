import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import App from './App';


describe('<App/>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('reorder()', () => {
  it(' move an item in a list to the desired index and reorder the remaining array ', () => {
    const initialArray = ['banana', 'apple', 'pear', 'blueberry'];

    const appleFirst = App.reorder(initialArray, 1, 0);
    const bananaSecondLast = App.reorder(initialArray, 0, 2);

    expect(appleFirst).toMatchObject(['apple', 'banana', 'pear', 'blueberry']);
    expect(bananaSecondLast).toMatchObject(['apple', 'pear', 'banana', 'blueberry']);
  });
});
