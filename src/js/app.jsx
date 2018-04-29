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
      notes: [new Note('This is a note.', 1), new Note('This is journal entry.', 2)],
      selectedNote: 0,
      noteCounter: 2,
    };
  }

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
        <NoteSelectionList notes={this.state.notes} />
        <TextEditor note={this.state.notes[this.state.selectedNote]} />;
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
