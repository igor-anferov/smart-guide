import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/index.css';
import App from './client/app';
import Swagger from './docs/swagger';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/api" component={Swagger} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
