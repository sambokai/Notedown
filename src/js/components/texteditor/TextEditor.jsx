import React from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';


class TextEditor extends React.Component {
  handleChange = (editor, data, value) => {
    this.props.onUpdateNote(value);
  };

  emptyNotePassed() {
    return Object.keys(this.props.note).length === 0;
  }


  render() {
    const codeMirrorOptions = {
      mode: 'markdown',
      autofocus: true,
      readOnly: this.emptyNotePassed() ? 'nocursor' : false,
      lineWrapping: true,
      placeholder: this.emptyNotePassed() ? this.props.noNoteMessage : this.props.placeholder,
    };

    return (
      <div className="h-100 row">
        <CodeMirror
          value={this.props.note.body}
          onBeforeChange={this.handleChange}
          className="w-100 h-100 mousetrap codemirror-wrapper col-6 texteditor"
          options={codeMirrorOptions}
        />
        <ReactMarkdown source={this.props.note.body} className="col-6 break-word-children" />
      </div>
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
