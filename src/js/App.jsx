import React from 'react';
import { render } from 'react-dom';

import { DragDropContext } from 'react-beautiful-dnd';

import Persistence from './model/Persistence';

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
      notes: [],
      selectedNoteIndex: 0,
      noteCreationAllowed: true,
    };

    this.textEditorTextarea = React.createRef();
  }

  componentWillMount() {
    this.syncFromLocalStorage();
  }

  componentDidMount() {
    this.focusTextEditorTextarea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedNoteIndex !== this.state.selectedNoteIndex) {
      this.noteSelectionChanged(prevState.selectedNoteIndex, this.state.selectedNoteIndex);
    }

    this.syncToLocalStorage(prevState);
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const selectedNoteId = this.getNoteByIndex(this.state.selectedNoteIndex).id;

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

  setAllowNoteCreation = (bool) => {
    this.setState({ noteCreationAllowed: bool });
  };

  getNoteByIndex(index) {
    if (typeof this.state.notes[index] !== 'undefined') {
      return this.state.notes[index];
    }

    return { body: '', id: -1 };
  }

  syncFromLocalStorage() {
    const noteCreationAllowed = Persistence.readFromLocalStorage('noteCreationAllowed');
    if (noteCreationAllowed !== null) this.setState({ noteCreationAllowed });

    const notes = Persistence.readFromLocalStorage('notes');
    if (notes) this.setState({ notes });

    const selectedNoteIndex = Persistence.readFromLocalStorage('selectedNoteIndex');
    if (selectedNoteIndex) this.setState({ selectedNoteIndex });
  }

  syncToLocalStorage(prevState) {
    if (prevState.noteCreationAllowed !== this.state.noteCreationAllowed) {
      Persistence.writeToLocalStorage('noteCreationAllowed', this.state.noteCreationAllowed);
    }
    if (prevState.notes !== this.state.notes) {
      Persistence.writeToLocalStorage('notes', this.state.notes);
    }

    if (prevState.selectedNoteIndex !== this.state.selectedNoteIndex) {
      Persistence.writeToLocalStorage('selectedNoteIndex', this.state.selectedNoteIndex);
    }
  }

  // eslint-disable-next-line no-unused-vars
  noteSelectionChanged(oldNoteIndex) {
    // Delete note if it is empty and user switches to another one
    if (this.getNoteByIndex(oldNoteIndex) && !this.getNoteByIndex(oldNoteIndex).body) {
      this.deleteNote(oldNoteIndex);
    }
  }

  addEmptyNote = () => {
    if (this.state.noteCreationAllowed) {
      this.setState({
        notes: this.state.notes.concat([new Note('')]),
        selectedNoteIndex: this.state.notes.length,
      });
      this.setAllowNoteCreation(false);
      this.focusTextEditorTextarea();
    }
  };

  deleteNote = (noteIndex) => {
    const notes = [...this.state.notes];
    if (this.getNoteByIndex(noteIndex) !== '') this.setAllowNoteCreation(true);
    notes.splice(noteIndex, 1);
    this.setState({
      notes,
      selectedNoteIndex: 0,
    });
  };


  handleTextEditorNoteUpdate = (newText) => {
    if (newText === '') { this.setAllowNoteCreation(false); } else this.setAllowNoteCreation(true);

    const notes = this.state.notes.slice();
    this.getNoteByIndex(this.state.selectedNoteIndex).body = newText;
    this.setState({ notes });
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
            onDeleteNote={() => this.deleteNote(this.state.selectedNoteIndex)}
            noteCreationAllowed={this.state.noteCreationAllowed}
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
                note={this.getNoteByIndex(this.state.selectedNoteIndex)}
                onUpdateNote={this.handleTextEditorNoteUpdate}
                ref={this.textEditorTextarea}
                setAllowNoteCreation={this.setAllowNoteCreation}
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
