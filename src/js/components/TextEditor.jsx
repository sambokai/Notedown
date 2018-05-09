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
        className="w-100"
        rows={15}
        style={textAreaStyle}
        placeholder={this.props.placeholder}
        value={this.props.note}
        onChange={this.handleChange}
        ref={this.props.textAreaRef}
      />
    );
  }
}

TextEditor.propTypes = {
  placeholder: PropTypes.string,
  note: PropTypes.string.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  textAreaRef: PropTypes.object.isRequired,
};

TextEditor.defaultProps = {
  placeholder: 'Write your notes in here...',
};

export default React.forwardRef((props, ref) =>
  <TextEditor {...props} textAreaRef={ref} />);
