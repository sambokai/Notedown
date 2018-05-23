/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';


// eslint-disable-next-line react/prefer-stateless-function
class ActionBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <a id="navbar-logo" className="navbar-brand" href="/">Notedown</a>
        <form className="form-inline">
          <button
            id="new-note-button"
            onClick={this.props.onCreateNote}
            type="button"
            className={`btn btn-primary ml-2 ${this.props.noteCreationAllowed ? '' : 'disabled'}`}
          >New Note
          </button>
          <button
            id="delete-note-button"
            onClick={this.props.onDeleteNote}
            type="button"
            className="btn btn-danger ml-2"
          >Delete
          </button>
        </form>
      </nav>
    );
  }
}

ActionBar.propTypes = {
  onCreateNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  noteCreationAllowed: PropTypes.bool.isRequired,
};


export default ActionBar;
