/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';


// eslint-disable-next-line react/prefer-stateless-function
class ActionBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Notedown</a>
        <button
          onClick={this.props.onCreateNote}
          type="button"
          className="btn btn-primary"
        >New Note
        </button>
      </nav>
    );
  }
}

ActionBar.propTypes = {
  onCreateNote: PropTypes.func.isRequired,
};


export default ActionBar;
