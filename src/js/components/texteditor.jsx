/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';


class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteText: this.props.note.body,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ noteText: e.target.value });
  }

  render() {
    const textAreaStyle = {
      resize: 'none',
    };

    return (
      <div>
        <textarea
          rows={20}
          cols={100}
          style={textAreaStyle}
          placeholder={this.props.placeholder}
          value={this.state.noteText}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  note: PropTypes.object.isRequired,
};

TextEditor.defaultProps = {
  placeholder: 'Write your notes in here...',
};

export default TextEditor;
