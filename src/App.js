import React from 'react';
import Box from '@material-ui/core/Box';
import Start from './start'
import Exam from './exam'
import Latex from './elements/latex'

import './app.css';

function App() {
  return (
    <Box height={1} overflow='scroll'>
      <Start/>
    </Box>
  );
  return (
    <Box height={1} overflow='scroll'>
      <Exam/>
    </Box>
  );
  return (
    <Box height={1} display='flex' overflow='hidden'>
      <Latex/>
    </Box>
  );
}

export default App;
