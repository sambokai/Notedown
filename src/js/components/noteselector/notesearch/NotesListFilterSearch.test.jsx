import React from 'react';

import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import NotesListFilterSearch from './NotesListFilterSearch';

const onUpdateSearchQueryMock = jest.fn();

describe('<NotesListFilterSearch/>', () => {
  it('should render correctly', () => {
    const wrapper = render(<NotesListFilterSearch onUpdateSearchQuery={onUpdateSearchQueryMock} />);

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it("should call onUpdateSearchQuery callback upon writing text, with value of text-input field as it's parameter", () => {
    const wrapper = mount(<NotesListFilterSearch onUpdateSearchQuery={onUpdateSearchQueryMock} />);
    const textSearchInput = wrapper.find('input');
    const searchQuery = 'Green Bell Peppers';

    textSearchInput.instance().value = searchQuery;
    textSearchInput.simulate('change');

    expect(onUpdateSearchQueryMock.mock.calls).toHaveLength(1);
    expect(onUpdateSearchQueryMock.mock.calls[0][0]).toBe(searchQuery);
  });
});
