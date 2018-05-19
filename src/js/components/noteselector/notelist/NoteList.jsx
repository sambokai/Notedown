import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';
import NoteListItem from './noteslistitem/NoteListItem';

class NoteList extends React.Component {
  filteredNotes() {
    return this.props.notes.filter(note => note.body.toLowerCase().includes(this.props.searchQuery.toLowerCase()));
  }

  render() {
    return (
      <Droppable droppableId="notesListDroppable">
        {droppableProvided => (
          <div className="list-group" ref={droppableProvided.innerRef}>
            {this.filteredNotes().map((note, index) =>
              (<NoteListItem
                note={note}
                key={note.id}
                listIndex={index}
                onSelectNote={this.props.onSelectNote}
                isSelected={note === this.props.selectedNote}
              />))}
            {droppableProvided.placeholder}
          </div>)}
      </Droppable>
    );
  }
}

NoteList.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectNote: PropTypes.func.isRequired,
  selectedNote: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  searchQuery: PropTypes.string,
};

NoteList.defaultProps = {
  searchQuery: '',
};


export default NoteList;
