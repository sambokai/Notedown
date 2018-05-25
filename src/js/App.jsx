import React from 'react';
import PropTypes from 'prop-types';

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
      noteCreationAllowed: true,
      noNoteSelectedMessage: 'Please select a note to display it.',
      noExistingNotesMessage: "Create a new note by clicking the 'New Note' Button",
    };

    // Keyboard Shortcuts
    Mousetrap.bind('ctrl+n', this.addEmptyNote);
    Mousetrap.bind('ctrl+d', () => this.deleteNote(this.readSelectedIdFromURL()));
  }

  componentWillMount() {
    this.syncFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match && prevProps.match.params) {
      const prevId = parseInt(prevProps.match.params.id, 10);
      if (prevId !== this.readSelectedIdFromURL()) {
        this.noteSelectionChanged(prevId, this.readSelectedIdFromURL());
      }
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

  readSelectedIdFromURL() {
    if (this.props.match) {
      return parseInt(this.props.match.params.id, 10) || null;
    } return null;
  }

  syncFromLocalStorage() {
    const noteCreationAllowed = Persistence.readFromLocalStorage('noteCreationAllowed');
    if (noteCreationAllowed !== null) this.setState({ noteCreationAllowed });

    const notes = Persistence.readFromLocalStorage('notes');
    if (notes) {
      const instantiatedNotes = notes.map(note => Note.fromObject(note));
      this.setState({ notes: instantiatedNotes });
    }
  }

  syncToLocalStorage(prevState) {
    if (prevState.noteCreationAllowed !== this.state.noteCreationAllowed) {
      Persistence.writeToLocalStorage('noteCreationAllowed', this.state.noteCreationAllowed);
    }
    if (prevState.notes !== this.state.notes) {
      Persistence.writeToLocalStorage('notes', this.state.notes);
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
      this.setState(prevState => ({
        notes: [...prevState.notes, newNote.valueOf()],
      }));
      this.setAllowNoteCreation(false);
      this.props.history.push(`/notes/${newNote.id}`);
    }
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

      const nextPath = nextSelectionId ? `/notes/${nextSelectionId}` : '/notes';

      this.setState({
        notes,
      });

      this.props.history.push(nextPath);

      // If deleted note was empty, allow creation again
      if (noteToBeDeletedObject.body === '') this.setAllowNoteCreation(true);
    }
  };


  handleTextEditorNoteUpdate = (newText, noteId) => {
    const notes = this.state.notes.slice();

    // Index is needed for modification of array with this.setState
    const selectedIndex = notes.findIndex(note => note.id === noteId);
    if (typeof notes[selectedIndex] !== 'undefined') { // Check if array contains the selected note's found index
      notes[selectedIndex].body = newText;
      this.setState({ notes });
    }

    // If the (new) body is empty, disallow creation of new notes.
    this.setAllowNoteCreation(newText !== '');
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

  render() {
    const components = {
      app: (
        <div className="h-100 pb-1">
          <ActionBar
            onCreateNote={this.addEmptyNote}
            onDeleteNote={() => this.deleteNote(this.readSelectedIdFromURL())}
            noteCreationAllowed={this.state.noteCreationAllowed}
          />
          <div className="row py-1 no-gutters" id="app-content" >
            <NoteSelector
              notes={this.state.notes}
              selectedId={this.readSelectedIdFromURL()}
            />
            <div className="col-8 pl-1">
              <TextEditor
                note={this.getNote(this.readSelectedIdFromURL())}
                onUpdateNote={newText => this.handleTextEditorNoteUpdate(newText, this.readSelectedIdFromURL())}
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

App.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  // eslint-disable-next-line react/require-default-props, react/forbid-prop-types
  history: PropTypes.object,
};

export default App;
