import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Main from './main';

export default function () {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={ Main } />
    </Switch>
  );
}
