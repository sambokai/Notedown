import React from 'react';

import Mousetrap from 'mousetrap';
import { DragDropContext } from 'react-beautiful-dnd';

import Persistence from './model/Persistence';

import Note from './model/Note';

import TextEditor from './components/texteditor/TextEditor';
import ActionBar from './components/actionbar/ActionBar';
import NoteSelector from './components/noteselector/NoteSelector';

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
      selectedNoteId: null,
      noteCreationAllowed: true,
      noNoteSelectedMessage: 'Please select a note to display it.',
      noExistingNotesMessage: "Create a new note by clicking the 'New Note' Button",
    };

    // Keyboard Shortcuts
    Mousetrap.bind('ctrl+n', this.addEmptyNote);
    Mousetrap.bind('ctrl+d', () => this.deleteNote(this.state.selectedNoteId));

    this.textEditorTextarea = React.createRef();
  }

  componentWillMount() {
    this.syncFromLocalStorage();
  }

  componentDidMount() {
    this.focusTextEditorTextarea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedNoteId !== this.state.selectedNoteId) {
      this.noteSelectionChanged(prevState.selectedNoteId, this.state.selectedNoteId);
    }

    this.syncToLocalStorage(prevState);
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const notes = App.reorder(
      this.state.notes,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      notes,
    });
  };

  setAllowNoteCreation = (bool) => {
    this.setState({ noteCreationAllowed: bool });
  };

  getNote(id) {
    return this.state.notes.find(note => note.id === id) || {};
  }

  getNoteIndex(id) {
    const index = this.state.notes.findIndex(note => note.id === id);
    return index === -1 ? undefined : index;
  }

  syncFromLocalStorage() {
    const noteCreationAllowed = Persistence.readFromLocalStorage('noteCreationAllowed');
    if (noteCreationAllowed !== null) this.setState({ noteCreationAllowed });

    const notes = Persistence.readFromLocalStorage('notes');
    if (notes) {
      const instantiatedNotes = notes.map(note => Note.fromObject(note));
      this.setState({ notes: instantiatedNotes });
    }

    const selectedNoteId = Persistence.readFromLocalStorage('selectedNoteId');
    if (selectedNoteId) this.setState({ selectedNoteId });
  }

  syncToLocalStorage(prevState) {
    if (prevState.noteCreationAllowed !== this.state.noteCreationAllowed) {
      Persistence.writeToLocalStorage('noteCreationAllowed', this.state.noteCreationAllowed);
    }
    if (prevState.notes !== this.state.notes) {
      Persistence.writeToLocalStorage('notes', this.state.notes);
    }
    if (prevState.selectedNoteId !== this.state.selectedNoteId) {
      Persistence.writeToLocalStorage('selectedNoteId', this.state.selectedNoteId);
    }
  }

  // eslint-disable-next-line no-unused-vars
  noteSelectionChanged(oldNoteId) {
    // Delete note if it exists, has no body-text and user switches to another one
    if (Object.getOwnPropertyNames(this.getNote(oldNoteId)).length > 0 && !this.getNote(oldNoteId).body) {
      this.deleteNote(oldNoteId);
    }
  }

  addEmptyNote = () => {
    if (this.state.noteCreationAllowed) {
      const newNote = new Note('');
      const newId = newNote.id;
      this.setState(prevState => ({
        notes: [...prevState.notes, newNote.valueOf()],
        selectedNoteId: newId.valueOf(),
      }));
      this.setAllowNoteCreation(false);
    }
    this.focusTextEditorTextarea();
  };

  deleteNote = (noteToBeDeletedId) => {
    const noteToBeDeletedObject = this.getNote(noteToBeDeletedId);

    // If noteToBeDeleted exists
    if (Object.getOwnPropertyNames(noteToBeDeletedObject).length > 0) {
      const notes = [...this.state.notes];

      const noteToBeDeletedIndex = this.getNoteIndex(noteToBeDeletedId);

      const previousNoteIndex = noteToBeDeletedIndex - 1; // Find the previous note
      const previousNoteIndexMinZero = previousNoteIndex >= 0 ? previousNoteIndex : 0; // Clamp to min. 0 index

      notes.splice(noteToBeDeletedIndex, 1); // Delete note from temporary notes-array

      // Set next selection, if pointing to nothing (e.x. notes list is empty), unselect
      const nextSelectionId = (notes[previousNoteIndexMinZero]) ? notes[previousNoteIndexMinZero].id : null;


      this.setState({
        notes,
        selectedNoteId: nextSelectionId,
      });

      // If deleted note was empty, allow creation again
      if (noteToBeDeletedObject.body === '') this.setAllowNoteCreation(true);

      this.focusTextEditorTextarea();
    }
  };


  handleTextEditorNoteUpdate = (newText) => {
    const notes = this.state.notes.slice();

    // Index is needed for modification of array with this.setState
    const selectedIndex = notes.findIndex(note => note.id === this.state.selectedNoteId);
    if (typeof notes[selectedIndex] !== 'undefined') { // Check if array contains the selected note's found index
      notes[selectedIndex].body = newText;
      this.setState({ notes });
    }

    // If the (new) body is empty, disallow creation of new notes.
    this.setAllowNoteCreation(newText !== '');
  };


  handleNotesListClick = (noteId) => {
    this.setState({ selectedNoteId: noteId });
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
            onDeleteNote={() => this.deleteNote(this.state.selectedNoteId)}
            noteCreationAllowed={this.state.noteCreationAllowed}
          />
          <div className="row py-1 no-gutters">
            <div className="col-4 pr-2">
              <NoteSelector
                notes={this.state.notes}
                onSelectNote={this.handleNotesListClick}
                selectedNote={this.getNote(this.state.selectedNoteId)}
              />
            </div>
            <div className="col-8 pl-1">
              <TextEditor
                note={this.getNote(this.state.selectedNoteId)}
                onUpdateNote={this.handleTextEditorNoteUpdate}
                ref={this.textEditorTextarea}
                setAllowNoteCreation={this.setAllowNoteCreation}
                noNoteMessage={
                  this.state.notes.length
                    ? this.state.noNoteSelectedMessage
                    : this.state.noExistingNotesMessage
                }
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

export default App;
