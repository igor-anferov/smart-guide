import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Main from './main';
import LaTeX from './latex/latex';

export default function () {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={ Main } />
      <Route exact path={`${match.url}/latex/new`} component={ LaTeX } />
      <Route exact path={`${match.url}/latex/:elemId`} component={ LaTeX } />
    </Switch>
  );
}
