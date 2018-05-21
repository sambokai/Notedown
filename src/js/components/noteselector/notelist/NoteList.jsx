import React from 'react';
import PropTypes from 'prop-types';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import NoteListItem from './noteslistitem/NoteListItem';

class NoteList extends React.Component {
  filteredNotes() {
    return this.props.notes.filter(note => note.body.toLowerCase().includes(this.props.searchQuery.toLowerCase()));
  }

  render() {
    let urlId;
    if (this.props.match && this.props.match.params) {
      urlId = parseInt(this.props.match.params.id, 10);
    }

    return (
      <Droppable droppableId="notesListDroppable">
        {droppableProvided => (
          <div className="list-group" ref={droppableProvided.innerRef}>
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
                      isSelected={note.id === urlId}
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
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  searchQuery: PropTypes.string,
};

NoteList.defaultProps = {
  searchQuery: '',
};


export default NoteList;
