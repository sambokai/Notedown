import React from 'react';
import PropTypes from 'prop-types';

class TextEditor extends React.Component {
  handleChange = (e) => {
    this.props.onUpdateNote(e.target.value);
  };

  render() {
    const textAreaStyle = {
      resize: 'none',
    };

    return (
      <textarea
        className="w-100 mousetrap"
        rows={15}
        style={textAreaStyle}
        placeholder={
          (this.props.note.id) ? this.props.placeholder : this.props.noNotesMessage
        }
        disabled={(this.props.note.id === null)}
        value={this.props.note.body}
        onChange={this.handleChange}
        ref={this.props.textAreaRef}
      />
    );
  }
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  noNotesMessage: PropTypes.string,
  note: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  textAreaRef: PropTypes.object.isRequired,
};

TextEditor.defaultProps = {
  placeholder: 'Write your notes in here...',
  noNotesMessage: "Create a new note by clicking the 'New Note' Button",
};

export default React.forwardRef((props, ref) =>
  <TextEditor {...props} textAreaRef={ref} />);
