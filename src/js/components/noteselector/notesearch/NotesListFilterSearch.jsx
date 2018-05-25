import React from 'react';
import PropTypes from 'prop-types';


function NotesListFilterSearch(props) {
  return (
    <div className="form-row pb-1">
      <div className="col">
        <input
          id="note-search-input"
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={e => props.onUpdateSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

NotesListFilterSearch.propTypes = {
  onUpdateSearchQuery: PropTypes.func.isRequired,
};

export default NotesListFilterSearch;
