/* eslint-disable comma-dangle,function-paren-newline */

import React from 'react';

import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { DragDropContext } from 'react-beautiful-dnd';

import NoteListItem from './NoteListItem';

let dateNowSpy;
const lockedTime = new Date(2010, 6, 15, 12).valueOf();

beforeAll(() => {
  // Lock Time
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => lockedTime);
});

afterAll(() => {
  // Unlock Time
  dateNowSpy.mockReset();
  dateNowSpy.mockRestore();
});

const onSelectNoteMock = jest.fn();
onSelectNoteMock.mockReturnValue('This Note was selected');

const mockData = {
  note: {
    body: 'This is Note #1',
    id: 1,
    lastChange: new Date(Date.UTC(2018, 0, 1)).valueOf()
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

describe('<NoteListItem/>', () => {
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

describe('getRelativeCalendarDate(date)', () => {
  it('returns exact time, if the provided date was today', () => {
    const lastChange = new Date(lockedTime);
    lastChange.setHours(lastChange.getHours() - 6);

    const relativeDate = NoteListItem.getRelativeCalendarDate(lastChange);
    expect(relativeDate).toBe('06:00');
  });

  it('returns \'Yesterday\', if the provided date was yesterday', () => {
    const lastChange = new Date(lockedTime);
    lastChange.setHours(lastChange.getHours() - 24);

    const relativeDate = NoteListItem.getRelativeCalendarDate(lastChange);
    expect(relativeDate).toBe('Yesterday');
  });

  it('returns exact date, if the provided date was more than 24 hours ago', () => {
    const lastChange = new Date(lockedTime);
    lastChange.setHours(lastChange.getHours() - (24 * 90));

    const relativeDate = NoteListItem.getRelativeCalendarDate(lastChange);
    expect(relativeDate).toBe('16.04.10');
  });

  it('returns exact date, if the provided date was more than 24 hours, but less than a week ago', () => {
    const lastChange = new Date(lockedTime);
    lastChange.setHours(lastChange.getHours() - (24 * 5));

    const relativeDate = NoteListItem.getRelativeCalendarDate(lastChange);
    expect(relativeDate).toBe('10.07.10');
  });
});
