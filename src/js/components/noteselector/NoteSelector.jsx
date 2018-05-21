import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

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
      <div className="mh-100 col-4 pr-2">
        <NotesListFilterSearch onUpdateSearchQuery={this.handleSearchQueryUpdate} />
        <Route
          path="/notes/:id?"
          component={props => (
            <NoteList
              notes={this.props.notes}
              searchQuery={this.state.searchQuery}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

NoteSelector.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteSelector;
