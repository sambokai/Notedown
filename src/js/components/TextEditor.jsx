/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';


class TextEditor extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    return {
      noteText: nextProps.note,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      noteText: props.note,
    };
  }

  handleChange = (e) => {
    this.setState({ noteText: e.target.value });
    this.props.onUpdateNote(e.target.value);
  };

  render() {
    const textAreaStyle = {
      resize: 'none',
    };

    return (
      <textarea
        className="w-100"
        rows={15}
        style={textAreaStyle}
        placeholder={this.props.placeholder}
        value={this.state.noteText}
        onChange={this.handleChange}
      />
    );
  }
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  note: PropTypes.string.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
};

TextEditor.defaultProps = {
  placeholder: 'Write your notes in here...',
};

export default TextEditor;
