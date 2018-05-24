import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment/moment';
import { Link } from 'react-router-dom';

import scrollIntoView from 'scroll-into-view-if-needed';

class NoteListItem extends React.Component {
  static relativeCalendarFormat = {
    sameDay: 'HH:mm',
    lastDay: '[Yesterday]',
    sameElse: 'DD.MM.YY',
    lastWeek: 'DD.MM.YY',
  };

  static getRelativeCalendarDate(date) {
    return Moment(date).calendar(null, this.relativeCalendarFormat);
  }

  constructor(props) {
    super(props);

    this.listItem = React.createRef();
  }

  componentDidMount() {
    if (this.props.isSelected && this.listItem.current) {
      scrollIntoView(this.listItem.current, {
        scrollMode: 'if-needed',
        behavior: 'smooth',
      });
    }
  }

  getNoteTitle() {
    if (this.props.note.body) {
      return this.props.note.body.match(/(\n|\s)*.*(\n|$)/)[0].trim();
    }

    return this.props.emptyNoteTitle;
  }

  render() {
    return (
      <Link
        id="note-list-item"
        innerRef={this.props.draggableProvided.innerRef}
        {...this.props.draggableProvided.draggableProps}
        {...this.props.draggableProvided.dragHandleProps}
        to={`/notes/${this.props.note.id}`}
        className={
            `flex-column align-items-center list-group-item list-group-item-action px-2
                ${(this.props.isSelected) ? 'active' : ''}
                ${this.props.note.body ? '' : 'disabled font-weight-light bg-secondary text-white'}`
          }
      >
        <div className="d-flex w-100 align-items-center justify-content-between" ref={this.listItem}>
          <p id="note-list-item-title" className="text-truncate pr-2 mb-0" >{this.getNoteTitle()}</p>
          <small id="note-list-item-lastchange-date" >
            {NoteListItem.getRelativeCalendarDate(this.props.note.lastChange)}
          </small>
        </div>
      </Link>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
    lastChange: PropTypes.number,
  }).isRequired,
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
