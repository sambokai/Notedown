import React from 'react';

import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import TextEditor from './TextEditor';

const onUpdateNoteMock = jest.fn();

describe('<TextEditor/>', () => {
  it('should render correctly if a note is passed', () => {
    const wrapper = render((
      <TextEditor
        note={{ body: 'This is a note.', id: 12412 }}
        onUpdateNote={onUpdateNoteMock}
      />
    ));

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should render a disabled html-textarea if NO note is passed', () => {
    const wrapper = render((
      <TextEditor
        note={{}}
        onUpdateNote={onUpdateNoteMock}
      />
    ));

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
