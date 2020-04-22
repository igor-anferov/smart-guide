import React from 'react';
import { ApiProvider } from './api';
import Box from '@material-ui/core/Box';
import Exams from './exams/router'
import Questions from './questions/router'
import Materials from './materials/router'
import Elements from './base_elements/router'

import { Switch, Route, Redirect } from 'react-router-dom'

import './app.css';

function App() {
  return (
    <Box height={1} overflow='hidden'>
      <ApiProvider>
        <Switch>
          <Route path='/exams' component={ Exams } />
          <Route path='/questions' component={ Questions } />
          <Route path='/materials' component={ Materials } />
          <Route path='/base_elements' component={ Elements } />

          <Redirect to='/exams' />
        </Switch>
      </ApiProvider>
    </Box>
  );
}

export default App;
