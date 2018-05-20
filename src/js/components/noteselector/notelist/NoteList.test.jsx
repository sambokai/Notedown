import React from 'react';

import { mount, shallow } from 'enzyme';


import { DragDropContext } from 'react-beautiful-dnd';
import { createSerializer, shallowToJson } from 'enzyme-to-json';

import NoteList from './NoteList';


expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

const onSelectNoteMock = jest.fn();

let mockProps = {
  notes: [
    { body: 'This is Note#1', id: 1, lastChange: new Date(2018, 0, 1).valueOf() },
    { body: 'This is Note#2', id: 2, lastChange: new Date(2018, 0, 2).valueOf() },
    { body: 'This is Note#3', id: 3, lastChange: new Date(2018, 0, 3).valueOf() },
    { body: 'This is Note#4', id: 4, lastChange: new Date(2018, 0, 4).valueOf() },
  ],
  onSelectNote: onSelectNoteMock,
};
mockProps = { ...mockProps, selectedNote: mockProps.notes[2] };

describe('<NoteList/>', () => {
  it('renders correctly', () => {
    const wrapper = shallow((
      <DragDropContext>
        <NoteList
          {...mockProps}
        />
      </DragDropContext>));

    expect(shallowToJson(wrapper))
      .toMatchSnapshot();
  });
});

describe('filteredNotes()', () => {
  it('should return all notes, if no search query prop was passed', () => {
    const wrapper = mount((
      <DragDropContext>
        <NoteList
          {...mockProps}
        />
      </DragDropContext>));

    const result = wrapper.find(NoteList)
      .instance()
      .filteredNotes();

    expect(result)
      .toMatchObject(mockProps.notes);
  });

  it('should return all notes containing, whose bodies contain the search query string', () => {
    const wrapper = mount((
      <DragDropContext>
        <NoteList
          {...mockProps}
          searchQuery="Note#4"
        />
      </DragDropContext>));

    const result = wrapper.find(NoteList)
      .instance()
      .filteredNotes();

    expect(result)
      .toMatchObject([mockProps.notes.find(note => note.id === 4)]);
  });
});
