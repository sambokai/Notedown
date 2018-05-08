/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { render } from 'react-dom';

import { DragDropContext } from 'react-beautiful-dnd';


import Note from './model/Note';

import TextEditor from './components/TextEditor';
import NoteSelectionList from './components/NoteSelectionList';

class App extends React.Component {
  static reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  constructor(props) {
    super(props);

    this.state = {
      notes: [new Note('This is a note.', 1), new Note('This is a journal entry.', 2)],
      selectedNote: 1,
      noteIdCounter: 2,
    };
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const notes = this.reorder(
      this.notes.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      notes,
    });
  };

  handleTextEditorNoteUpdate = (newText) => {
    const notes = this.state.notes.slice();
    const indexOfOldNote = notes.findIndex(note => note.id === this.state.selectedNote);
    notes[indexOfOldNote] = new Note(newText, this.state.selectedNote);
    this.setState({ notes });
  };

  addEmptyNote = () => {
    const newNoteId = this.increaseNotesCounter();
    this.setState({
      notes: this.state.notes.concat([new Note('', newNoteId)]),
    });
    this.setState({ selectedNote: newNoteId });
  };

  handleNotesListClick = (note) => {
    this.setState({ selectedNote: note.id });
  };

  increaseNotesCounter() {
    const nextNumber = this.state.noteIdCounter + 1;
    this.setState({ noteIdCounter: nextNumber });
    return nextNumber;
  }

  dragDropContext(content) {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {content}
      </DragDropContext>
    );
  }


  render() {
    const components = {
      app: (
        <div className="container">
          <div className="row py-1 ">
            <div className="col">
              <NoteSelectionList
                notes={this.state.notes}
                onSelectNote={this.handleNotesListClick}
                onCreateNote={this.addEmptyNote}
                selectedNote={this.state.selectedNote}
              />
            </div>
            <div className="col-8 ">
              <TextEditor
                note={this.state.notes.find(note => note.id === this.state.selectedNote)}
                onUpdateNote={this.handleTextEditorNoteUpdate}
              />
            </div>
          </div>
        </div>),
    };

    return (
      this.dragDropContext(components.app)
    );
  }
}

render(<App />, document.getElementById('app'));
