import React from 'react';
import PropTypes from 'prop-types';
import NoteList from './notelist/NoteList';
import NotesListFilterSearch from './notesearch/NotesListFilterSearch';

class NoteSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  handleSearchQueryUpdate = (searchQuery) => {
    this.setState({ searchQuery: searchQuery.trim() });
  };


  render() {
    return (
      <div>
        <NotesListFilterSearch onUpdateSearchQuery={this.handleSearchQueryUpdate} />
        <NoteList
          notes={this.props.notes}
          onSelectNote={this.props.onSelectNote}
          selectedNote={this.props.selectedNote}
          searchQuery={this.state.searchQuery}
        />
      </div>
    );
  }
}

NoteSelector.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectNote: PropTypes.func.isRequired,
  selectedNote: PropTypes.number.isRequired,
};

export default NoteSelector;
