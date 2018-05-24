import React from 'react';
import PropTypes from 'prop-types';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import NoteListItem from './noteslistitem/NoteListItem';

class NoteList extends React.Component {
  filteredNotes() {
    return this.props.notes.filter(note => note.body.toLowerCase().includes(this.props.searchQuery.toLowerCase()));
  }

  render() {
    const style = {
      overflowY: 'scroll',
      height: '90%',
    };

    return (
      <Droppable droppableId="notesListDroppable">
        {droppableProvided => (
          <div id="note-list" className="list-group" style={style} ref={droppableProvided.innerRef}>
            {this.filteredNotes().map((note, index) =>
              (
                <Draggable
                  draggableId={note.id}
                  index={index}
                  key={note.id}
                >
                  {draggableProvided => (
                    <NoteListItem
                      draggableProvided={draggableProvided}
                      note={note}
                      key={note.id}
                      isSelected={note.id === this.props.selectedId}
                    />
                  )}
                </Draggable>
              ))}
            {droppableProvided.placeholder}
          </div>)}
      </Droppable>
    );
  }
}


NoteList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  selectedId: PropTypes.number,

};

NoteList.defaultProps = {
  searchQuery: '',
};


export default NoteList;
