import React from 'react';
import PropTypes from 'prop-types';

import { Droppable, Draggable } from 'react-beautiful-dnd';


// eslint-disable-next-line react/prefer-stateless-function
class NoteSelectionList extends React.Component {
  getNoteTitle(noteBody) {
    if (noteBody) {
      return noteBody.match(/(\n|\s)*.*(\n|$)/)[0].trim();
    }

    return this.props.emptyNoteTitle;
  }

  handleNoteSelection(noteIndex) {
    this.props.onSelectNote(noteIndex);
  }
  render() {
    return (
      <Droppable droppableId="notesListDroppable">
        {droppableProvided => (
          <div className="list-group" ref={droppableProvided.innerRef}>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            {this.props.notes.map((note, index) =>
              (
                <Draggable draggableId={note.id} key={note.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <a
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      href="#"
                      className={`d-inline-block justify-content-between align-items-center list-group-item list-group-item-action text-truncate ${(this.props.selectedNote === index) && !draggableSnapshot.isDragging ? 'active' : ''} ${note.body ? '' : 'disabled font-weight-light bg-secondary text-white'}`}
                      onClick={() => this.handleNoteSelection(index)}
                      id="note-list-item"
                    >
                      {this.getNoteTitle(note.body)}
                    </a>)}
                </Draggable>
              ))
            }
            {droppableProvided.placeholder}
          </div>)}
      </Droppable>
    );
  }
}

NoteSelectionList.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectNote: PropTypes.func.isRequired,
  selectedNote: PropTypes.number.isRequired,
  emptyNoteTitle: PropTypes.string,
};

NoteSelectionList.defaultProps = {
  emptyNoteTitle: 'Empty',
};


export default NoteSelectionList;
