import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Main from './main';
import Material from './material'

export default function () {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={ Main } />
      <Route exact path={`${match.url}/:material_id/edit`} component={ Material } />
    </Switch>
  );
}
