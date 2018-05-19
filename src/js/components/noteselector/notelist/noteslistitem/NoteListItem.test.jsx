/* eslint-disable comma-dangle,function-paren-newline */

import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import renderer from 'react-test-renderer';

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
