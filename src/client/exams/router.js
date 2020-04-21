import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Main from './main';
import Exam from './exam';

export default function () {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={ Main } />
      <Route exact path={`${match.url}/new`} component={ Exam } />
      <Route exact path={`${match.url}/:examId`} component={ Exam } />
    </Switch>
  );
}
