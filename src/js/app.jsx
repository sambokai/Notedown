/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { render } from 'react-dom';

import TextEditor from './components/texteditor';

class App extends React.Component {
  render() {
    return <TextEditor />;
  }
}

render(<App />, document.getElementById('app'));
