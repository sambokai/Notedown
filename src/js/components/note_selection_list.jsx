import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class NoteSelectionList extends React.Component {
  static truncate(string, maxCharacterSize) {
    if (string.length > maxCharacterSize) {
      return `${string.substring(0, maxCharacterSize)}...`;
    }
    return string;
  }

  render() {
    return (
      <ul>
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        {this.props.notes.map(note =>
          (
            <li key={note.id}>
              <a href="#">{note.id}: {NoteSelectionList.truncate(note.body, 25)}</a>
            </li>
          ))
        }
      </ul>
    );
  }
}

NoteSelectionList.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default NoteSelectionList;
