import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import App from './js/App';

import './css/style.css';

render(
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/notes" />
      )}
      />
      <Route path="/notes/:id?" component={App} />
    </Switch>
  </Router>
  , document.getElementById('container'),
);
