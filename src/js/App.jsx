/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { render } from 'react-dom';

import { DragDropContext } from 'react-beautiful-dnd';


import Note from './model/Note';

import TextEditor from './components/TextEditor';
import NoteSelectionList from './components/NoteSelectionList';
import ActionBar from './components/ActionBar';

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
      notes: [new Note('This is a note.'), new Note('This is a journal entry.')],
      selectedNote: 0,
    };

    this.textEditorTextarea = React.createRef();
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const selectedNoteId = this.state.notes[this.state.selectedNote].id;

    const notes = App.reorder(
      this.state.notes,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      notes,
      selectedNote: notes.findIndex(note => note.id === selectedNoteId),
    });
  };

  handleTextEditorNoteUpdate = (newText) => {
    const notes = this.state.notes.slice();
    notes[this.state.selectedNote].body = newText;
    this.setState({ notes });
  };

  addEmptyNote = () => {
    const newNote = new Note('');

    this.setState({
      notes: this.state.notes.concat([newNote]),
      selectedNote: this.state.notes.length,
    });

    this.focusTextEditorTextarea();
  };

  handleNotesListClick = (noteIndex) => {
    this.setState({ selectedNote: noteIndex });
  };

  dragDropContext(content) {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        {content}
      </DragDropContext>
    );
  }

  focusTextEditorTextarea() {
    this.textEditorTextarea.current.focus();
  }

  render() {
    const components = {
      app: (
        <div className="container">
          <ActionBar
            onCreateNote={this.addEmptyNote}
          />
          <div className="row py-1 ">
            <div className="col-4">
              <NoteSelectionList
                notes={this.state.notes}
                onSelectNote={this.handleNotesListClick}
                selectedNote={this.state.selectedNote}
              />
            </div>
            <div className="col-8 ">
              <TextEditor
                note={this.state.notes[this.state.selectedNote].body}
                onUpdateNote={this.handleTextEditorNoteUpdate}
                ref={this.textEditorTextarea}
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
