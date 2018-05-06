/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { render } from 'react-dom';

import Note from './model/Note';

import TextEditor from './components/texteditor';
import NoteSelectionList from './components/note_selection_list';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [new Note('This is a note.', 1), new Note('This is a journal entry.', 2)],
      selectedNote: 1,
      noteIdCounter: 2,
    };
  }

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


  render() {
    return (
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
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
