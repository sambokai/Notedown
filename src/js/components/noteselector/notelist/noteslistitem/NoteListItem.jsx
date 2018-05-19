import React from 'react';
import PropTypes from 'prop-types';
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
      <a
        ref={this.props.draggableProvided.innerRef}
        {...this.props.draggableProvided.draggableProps}
        {...this.props.draggableProvided.dragHandleProps}
        role="button"
        tabIndex={-1}
        className={
          `flex-column align-items-center list-group-item list-group-item-action px-2
              ${(this.props.isSelected) ? 'active' : ''}
              ${this.props.note.body ? '' : 'disabled font-weight-light bg-secondary text-white'}`
        }
        onClick={() => this.props.onSelectNote(this.props.note.id)}
        onKeyDown={() => this.props.onSelectNote(this.props.note.id)}
      >
        <div className="d-flex w-100 align-items-center justify-content-between">
          <p id="note-list-item-title" className="text-truncate pr-2 mb-0">{this.getNoteTitle()}</p>
          <small >
            {NoteListItem.getRelativeCalendarDate(this.props.note.lastChange)}
          </small>
        </div>
      </a>
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

  draggableProvided: PropTypes.shape({
    innerRef: PropTypes.func,
    draggableProps: PropTypes.object,
    dragHandleProps: PropTypes.object,
  }),
};


NoteListItem.defaultProps = {
  emptyNoteTitle: 'Empty',
  draggableProvided: {},
};

export default NoteListItem;
