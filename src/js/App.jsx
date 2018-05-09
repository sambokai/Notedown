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
      selectedNoteIndex: 0,
    };

    this.textEditorTextarea = React.createRef();
  }

  componentDidMount() {
    this.focusTextEditorTextarea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedNoteIndex !== this.state.selectedNoteIndex) {
      this.noteSelectionChanged(prevState.selectedNoteIndex, this.state.selectedNoteIndex);
    }
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const selectedNoteId = this.state.notes[this.state.selectedNoteIndex].id;

    const notes = App.reorder(
      this.state.notes,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      notes,
      selectedNoteIndex: notes.findIndex(note => note.id === selectedNoteId),
    });
  };

  handleTextEditorNoteUpdate = (newText) => {
    const notes = this.state.notes.slice();
    notes[this.state.selectedNoteIndex].body = newText;
    this.setState({ notes });
  };

  noteSelectionChanged(oldNoteIndex, newNoteIndex) {
    // Delete note if it is empty and user switches to another one
    if (this.state.notes[oldNoteIndex] && !this.state.notes[oldNoteIndex].body) {
      this.deleteNote(oldNoteIndex);
    }
  }

  addEmptyNote = () => {
    const newNote = new Note('');

    this.setState({
      notes: this.state.notes.concat([newNote]),
      selectedNoteIndex: this.state.notes.length,
    });

    this.focusTextEditorTextarea();
  };

  deleteNote = (noteIndex) => {
    const notes = [...this.state.notes];
    notes.splice(noteIndex, 1);
    this.setState({
      notes,
      selectedNoteIndex: 0,
    });
  };

  handleNotesListClick = (noteIndex) => {
    this.setState({ selectedNoteIndex: noteIndex });
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
                selectedNote={this.state.selectedNoteIndex}
              />
            </div>
            <div className="col-8 ">
              <TextEditor
                note={this.state.notes[this.state.selectedNoteIndex].body}
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
