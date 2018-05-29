import React from 'react';

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import App from './App';
import Note from './model/Note';

const pushMock = jest.fn();
const historyMock = { push: pushMock };

describe('<App/>', () => {
  it('should render correctly, when there are no notes', () => {
    const wrapper = shallow(<App />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly, when notes are existing', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ notes: [{ body: 'This is a note.', id: 5 }] });

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });


  it('should call noteSelectionChanged hook, when the user selects another note by id', () => {
    const firstSelectionId = 99;
    const secondSelectionId = 50;
    const wrapper = shallow(<App match={{ params: { id: firstSelectionId.toString(10) } }} />);

    const selectionChanged = jest.fn();
    wrapper.instance().noteSelectionChanged = selectionChanged;
    wrapper.update();
    wrapper.setProps({ match: { params: { id: secondSelectionId.toString(10) } } });

    expect(selectionChanged)
      .toBeCalledWith(firstSelectionId, secondSelectionId);
  });
});

describe('getNoteIndex()', () => {
  it("should find a note's index in the state array, by id", () => {
    const notes = [
      { id: 60, body: 'This is the first test note.' },
      { id: 99, body: 'This is the second test note.' },
    ];
    const wrapper = shallow(<App />);
    wrapper.setState({ notes });

    expect(wrapper.instance().getNoteIndex(99)).toEqual(1);
  });

  it('should return undefined if the sought-after id, is existing in the note array', () => {
    const notes = [
      { id: 60, body: 'This is the first test note.' },
      { id: 99, body: 'This is the second test note.' },
    ];
    const wrapper = shallow(<App />);
    wrapper.setState({ notes });

    expect(wrapper.instance().getNoteIndex(1000)).toBeUndefined();
  });
});

describe('readSelectedIdFromURL()', () => {
  it('should return null if the id in the url path is not a number', () => {
    const wrapper = shallow(<App match={{ params: { id: 'this-is-a-string' } }} />);

    expect(wrapper.instance().readSelectedIdFromURL()).toBeNull();
  });
});

describe('noteSelectionChanged()', () => {
  it('should delete the empty note if noteSelectionChanged goes from an empty to another note', () => {
    const deleteNoteMock = jest.fn();
    const wrapper = shallow(<App />);
    const notes = [
      new Note('This is Note #1.', 1),
      new Note('', 2),
    ];
    wrapper.setState({ notes });
    wrapper.instance().deleteNote = deleteNoteMock;

    wrapper.instance().noteSelectionChanged(2);

    expect(deleteNoteMock).toBeCalledWith(2, false);
  });
});

describe('addEmptyNote()', () => {
  it('should create an empty note, if creation is allowed', () => {
    const wrapper = shallow(<App history={historyMock} />);
    wrapper.setState({ noteCreationAllowed: true, notes: [] });

    wrapper.instance().addEmptyNote();

    expect(wrapper.state('notes')[0].body).toEqual('');
    expect(wrapper.state('notes')[0].id).toEqual(1);
    expect(wrapper.state('notes')).toHaveLength(1);
  });

  it('should select the newly created note, after creation', () => {
    const wrapper = shallow(<App history={historyMock} />);

    wrapper.instance().addEmptyNote();

    expect(pushMock).toHaveBeenCalledWith('/notes/1');
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});

describe('deleteNote()', () => {
  it('should delete a note, specified by id', () => {
    const wrapper = shallow(<App />);
    const note = new Note('This is Note #1.', 1);
    wrapper.setState({ notes: [note] });

    wrapper.instance().deleteNote(note.id);

    expect(wrapper.state('notes')).toHaveLength(0);
  });

  it('should, after deletion, select the note, previous to the one deleted', () => {
    const wrapper = shallow(<App history={historyMock} />);
    const notes = [
      new Note('This is Note #1.', 1),
      new Note('This is Note #2', 2),
      new Note('This is Note #3', 3),
      new Note('This is Note #4', 4),
    ];
    wrapper.setState({ notes });

    wrapper.instance().deleteNote(3, true);

    expect(pushMock).toBeCalledWith('/notes/2');
    expect(pushMock).toHaveBeenCalledTimes(1);
  });

  it('should set noteCreationAllowed to true, if the deleted note was empty', () => {
    const wrapper = shallow(<App />);
    const notes = [
      new Note('This is a note with text.', 1),
      new Note('', 2),
    ];
    wrapper.setState({ notes, noteCreationAllowed: false });

    wrapper.instance().deleteNote(2);

    expect(wrapper.state('noteCreationAllowed')).toBe(true);
  });
});

describe('Persistence (Local Storage)', () => {
  describe('syncFromLocalStorage()', () => {
    it('should read noteCreationAllowed from localStorage into app state', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ noteCreationAllowed: false });

      localStorage.setItem('noteCreationAllowed', 'true');
      wrapper.instance().syncFromLocalStorage();

      expect(wrapper.state('noteCreationAllowed')).toBe(true);
    });

    it('should read notes from localStorage into app state', () => {
      const wrapper = shallow(<App />);
      wrapper.setState({ notes: [] });

      const notes = [
        new Note('This is Note #1.'),
        new Note('This is Note #2.'),
      ];

      localStorage.setItem('notes', JSON.stringify(notes));
      wrapper.instance().syncFromLocalStorage();

      expect(wrapper.state('notes')).toMatchObject(notes);
    });
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
