import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Moment from 'moment/moment';


class NoteListItem extends React.Component {
  static relativeCalendarFormat = {
    sameDay: 'HH:mm',
    lastDay: '[Yesterday]',
    sameElse: 'DD.MM.YY',
  };

  static getRelativeCalendarDate(date) {
    return Moment(date).calendar(null, this.relativeCalendarFormat);
  }

  getNoteTitle() {
    if (this.props.note.body) {
      return this.props.note.body.match(/(\n|\s)*.*(\n|$)/)[0].trim();
    }

    return this.props.emptyNoteTitle;
  }

  render() {
    return (
      <Draggable
        draggableId={this.props.note.id}
        index={this.props.listIndex}
        key={this.props.note.id}
      >
        {(draggableProvided, draggableSnapshot) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            href="#"
            className={
              `flex-column align-items-center list-group-item list-group-item-action px-2
              ${(this.props.isSelected) && !draggableSnapshot.isDragging ? 'active' : ''}
              ${this.props.note.body ? '' : 'disabled font-weight-light bg-secondary text-white'}`
            }
            onClick={() => this.props.onSelectNote(this.props.note.id)}
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <p id="note-list-item-title" className="text-truncate pr-2 mb-0">{this.getNoteTitle()}</p>
              <small >
                {NoteListItem.getRelativeCalendarDate(this.props.note.lastChange)}
              </small>
            </div>
          </a>)}
      </Draggable>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
    lastChange: PropTypes.number,
  }).isRequired,
  onSelectNote: PropTypes.func.isRequired,
  emptyNoteTitle: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  listIndex: PropTypes.number.isRequired,
};


NoteListItem.defaultProps = {
  emptyNoteTitle: 'Empty',
};

export default NoteListItem;
