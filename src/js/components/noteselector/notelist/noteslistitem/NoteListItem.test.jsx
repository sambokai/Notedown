/* eslint-disable comma-dangle,function-paren-newline */

import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { DragDropContext } from 'react-beautiful-dnd';

import NoteListItem from './NoteListItem';


const onSelectNoteMock = jest.fn();
onSelectNoteMock.mockReturnValue('This Note was selected');

const mockData = {
  note: {
    body: 'This is Note #1',
    id: 1,
    lastChange: new Date(2018, 0).valueOf()
  },
  draggableProvided: {},
  onSelectNote: onSelectNoteMock
};

const mockSelectedNoteListItem = (
  <NoteListItem
    note={mockData.note}
    onSelectNote={mockData.onSelectNote}
    isSelected
    draggableProvided={mockData.draggableProvided}
  />
);

it('renders correctly', () => {
  const wrapper = renderer
    .create(
      <DragDropContext>
        {mockSelectedNoteListItem}
      </DragDropContext>
    );

  expect(wrapper)
    .toMatchSnapshot();
});

describe('getNoteTitle()', () => {
  it("returns the first line of text in a note's body as a trimmed string", () => {
    const testNote = {
      ...mockData.note,
      body: ' \n \n    This is the first line of Note #1     \n \n ' +
      'Yesterday I went to the mall. It was great.'
    };

    const wrapper = shallow(<NoteListItem isSelected note={testNote} onSelectNote={mockData.onSelectNote} />);

    const result = wrapper.instance().getNoteTitle();

    expect(result).toBe('This is the first line of Note #1');
  });

  it("returns a predefined 'Empty'-Message if the note's body is empty", () => {
    const testNote = {
      ...mockData.note,
      body: ''
    };
    const emptyNoteTitle = 'Empty';

    const wrapper = shallow(
      <NoteListItem isSelected note={testNote} onSelectNote={mockData.onSelectNote} emptyNoteTitle={emptyNoteTitle} />
    );

    const result = wrapper.instance().getNoteTitle();

    expect(result).toBe(emptyNoteTitle);
  });
});
