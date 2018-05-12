import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'moment';

import { Droppable, Draggable } from 'react-beautiful-dnd';


class NoteSelectionList extends React.Component {
  static relativeCalendarFormat = {
    sameDay: 'HH:mm',
    lastDay: '[Yesterday]',
    sameElse: 'DD.MM.YY',
  };

  static getRelativeCalendarDate(date) {
    return Moment(date).calendar(null, this.relativeCalendarFormat);
  }

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
                      className={`flex-column align-items-center list-group-item list-group-item-action px-2 ${(this.props.selectedNote === index) && !draggableSnapshot.isDragging ? 'active' : ''} ${note.body ? '' : 'disabled font-weight-light bg-secondary text-white'}`}
                      onClick={() => this.handleNoteSelection(index)}
                    >
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <p id="note-list-item-title" className="text-truncate pr-2 mb-0">{this.getNoteTitle(note.body)}</p>
                        <small >
                          {NoteSelectionList.getRelativeCalendarDate(note.lastChange)}
                        </small>
                      </div>
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
