import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NoteSelector from './NoteSelector';


const onSelectNoteMock = jest.fn();
let mockProps = {
  notes: [
    { body: 'This is Note#1', id: 1, lastChange: 1514761200000 },
    { body: 'This is Note#2', id: 2, lastChange: 1514847600000 },
    { body: 'This is Note#3', id: 3, lastChange: 1514934000000 },
    { body: 'This is Note#4', id: 4, lastChange: 1515020400000 },
  ],
  onSelectNote: onSelectNoteMock,
};
mockProps = { ...mockProps, selectedNote: mockProps.notes[2] };

describe('<NoteSelector/>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NoteSelector {...mockProps} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe('handleSearchQueryUpdate(searchQuery)', () => {
  it('should trim trailing and leading whitespace/newlines of searchQuery state', () => {
    const wrapper = shallow(<NoteSelector {...mockProps} />);
    const searchQuery = '  Bananas  \n';

    wrapper.instance().handleSearchQueryUpdate(searchQuery);

    expect(wrapper.state('searchQuery')).toBe('Bananas');
  });
});
