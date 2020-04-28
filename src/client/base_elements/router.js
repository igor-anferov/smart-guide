import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Main from './main';
import LaTeX from './latex/latex';

export default function () {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={ Main } />
      <Route exact path={`${match.url}/new/latex`} component={ LaTeX } />
      <Route exact path={`${match.url}/:base_element_id/latex/edit`} component={ LaTeX } />
    </Switch>
  );
}
