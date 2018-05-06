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

  handleNoteSelection(note) {
    this.props.onSelectNote(note);
  }

  render() {
    return (
      <div>
        <div className="row justify-content-center pb-1">
          <button
            onClick={this.props.onCreateNote}
            type="button"
            className="btn btn-primary"
          >New Note
          </button>
        </div>
        <div className="list-group">
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          {this.props.notes.map(note =>
            (
              <a
                href="#"
                key={note.id}
                className={`d-flex justify-content-between align-items-center list-group-item list-group-item-action ${(this.props.selectedNote === note.id) ? 'active' : ''}`}
                onClick={() => this.handleNoteSelection(note)}
              >
                {NoteSelectionList.truncate(note.body, 25)}
              </a>
            ))
          }
        </div>
      </div>

    );
  }
}

NoteSelectionList.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectNote: PropTypes.func.isRequired,
  onCreateNote: PropTypes.func.isRequired,
  selectedNote: PropTypes.number.isRequired,
};


export default NoteSelectionList;
