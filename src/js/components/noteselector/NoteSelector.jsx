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
      <div className="mh-100 col-2 pr-2">
        <NotesListFilterSearch onUpdateSearchQuery={this.handleSearchQueryUpdate} />
        <NoteList
          notes={this.props.notes}
          searchQuery={this.state.searchQuery}
          selectedId={this.props.selectedId}
        />
      </div>
    );
  }
}

NoteSelector.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  selectedId: PropTypes.number,
};

export default NoteSelector;
