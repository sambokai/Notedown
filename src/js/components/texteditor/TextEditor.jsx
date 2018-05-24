import React from 'react';
import PropTypes from 'prop-types';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.textArea = React.createRef();
  }

  componentDidMount() {
    this.focusTextArea();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note.id !== this.props.note.id) {
      this.focusTextArea();
    }
  }

  focusTextArea() {
    if (this.textArea.current) {
      this.textArea.current.focus();
    }
  }

  handleChange = (e) => {
    this.props.onUpdateNote(e.target.value);
  };

  emptyNotePassed() {
    return Object.keys(this.props.note).length === 0;
  }


  render() {
    const textAreaStyle = {
      resize: 'none',
    };

    return (
      <textarea
        id="text-editor-textarea"
        className="w-100 h-100 mousetrap"
        rows={15}
        style={textAreaStyle}
        placeholder={
          (this.props.note.id) ? this.props.placeholder : this.props.noNoteMessage
        }
        disabled={this.emptyNotePassed()}
        value={this.emptyNotePassed() ? '' : this.props.note.body}
        onChange={this.handleChange}
        ref={this.textArea}
      />
    );
  }
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  noNoteMessage: PropTypes.string,
  note: PropTypes.shape({
    body: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdateNote: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {
  placeholder: 'Write your notes in here...',
  noNoteMessage: 'No note selected',
};

export default TextEditor;
