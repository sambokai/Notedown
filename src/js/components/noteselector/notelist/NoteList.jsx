import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';
import NoteListItem from './noteslistitem/NoteListItem';

class NoteList extends React.Component {
  render() {
    const filteredNotes = this.props.notes
      .filter(note => note.body.toLowerCase().includes(this.props.searchQuery.toLowerCase()));

    return (
      <Droppable droppableId="notesListDroppable">
        {droppableProvided => (
          <div className="list-group" ref={droppableProvided.innerRef}>
            {filteredNotes.map((note, index) =>
              (<NoteListItem
                note={note}
                key={note.id}
                listIndex={index}
                onSelectNote={this.props.onSelectNote}
                isSelected={this.props.selectedNote === index} // FIXME: this is wrong, because the array index of filteredNotes does not always match the this.props.selectedNote, which works with the non-filtered array of notes
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
  selectedNote: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
};


export default NoteList;
