import React from 'react';
import PropTypes from 'prop-types';


class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteBody: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ noteBody: e.target.value });
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
          value={this.state.noteBody}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
};

TextEditor.defaultProps = {
  placeholder: 'Write your notes in here...',
};

export default TextEditor;
