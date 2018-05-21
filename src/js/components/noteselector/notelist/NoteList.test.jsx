import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mount, shallow } from 'enzyme';


import { DragDropContext } from 'react-beautiful-dnd';
import { createSerializer, shallowToJson } from 'enzyme-to-json';

import NoteList from './NoteList';


expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

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
      <MemoryRouter>
        <DragDropContext>
          <NoteList
            {...mockProps}
          />
        </DragDropContext>
      </MemoryRouter>
    ));

    const result = wrapper.find(NoteList)
      .instance()
      .filteredNotes();

    expect(result)
      .toMatchObject(mockProps.notes);
  });

  it('should return all notes containing, whose bodies contain the search query string', () => {
    const wrapper = mount((
      <MemoryRouter>
        <DragDropContext>
          <NoteList
            {...mockProps}
            searchQuery="Note#4"
          />
        </DragDropContext>
      </MemoryRouter>
    ));

    const result = wrapper.find(NoteList)
      .instance()
      .filteredNotes();

    expect(result)
      .toMatchObject([mockProps.notes.find(note => note.id === 4)]);
  });
});
