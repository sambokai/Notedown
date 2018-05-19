import React from 'react';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme/build/index';

import ActionBar from './ActionBar';

const onCreateNoteMock = jest.fn();
const onDeleteNoteMock = jest.fn();

const mockPropCallbacks = {
  onCreateNote: onCreateNoteMock,
  onDeleteNote: onDeleteNoteMock,
};

describe('<ActionBar/>', () => {
  it('renders correctly with delete-button enabled if creation of new notes is allowed', () => {
    const wrapper = renderer
      .create(<ActionBar {...mockPropCallbacks} noteCreationAllowed />);

    expect(wrapper)
      .toMatchSnapshot();
  });

  it('renders correctly with delete-button disabled if creation of new notes is forbidden', () => {
    const wrapper = renderer
      .create(<ActionBar {...mockPropCallbacks} noteCreationAllowed={false} />);

    expect(wrapper)
      .toMatchSnapshot();
  });

  it("calls onCreateNote callback, upon click on the 'New Note' button ", () => {
    const wrapper = shallow(<ActionBar {...mockPropCallbacks} noteCreationAllowed />);

    wrapper.find('#new-note-button').simulate('click');
    expect(mockPropCallbacks.onCreateNote.mock.calls).toHaveLength(1);
  });

  it("calls onDeleteNote callback, upon click on the 'Delete' button ", () => {
    const wrapper = shallow(<ActionBar {...mockPropCallbacks} noteCreationAllowed />);

    wrapper.find('#delete-note-button').simulate('click');
    expect(mockPropCallbacks.onDeleteNote.mock.calls).toHaveLength(1);
  });
});
