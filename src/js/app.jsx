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
      noteCounter: 2,
    };
  }

  handleNotesListClick = (note) => {
    this.setState({ selectedNote: note.id });
  };

  handleTextEditorNoteUpdate = (newText) => {
    const notes = this.state.notes.slice();
    const indexOfOldNote = notes.findIndex(note => note.id === this.state.selectedNote);
    notes[indexOfOldNote] = new Note(newText, this.state.selectedNote);
    this.setState({ notes });
  };

  addNote(noteText) {
    this.setState({
      notes: this.state.notes.concat([new Note(noteText, this.increaseNotesCounter())]),
    });
  }

  increaseNotesCounter() {
    const nextNumber = this.state.noteCounter + 1;
    this.setState({ noteCounter: nextNumber });
    return nextNumber;
  }


  render() {
    return (
      <div>
        <NoteSelectionList
          notes={this.state.notes}
          onSelectNote={this.handleNotesListClick}
        />
        <TextEditor
          note={this.state.notes.find(note => note.id === this.state.selectedNote)}
          onUpdateNote={this.handleTextEditorNoteUpdate}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
