import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import TopMenu from '../top-menu';
import QuestionsList from './list';

export default function () {
  return (
    <React.Fragment>
      <CssBaseline/>
      <TopMenu/>
      <Box p={8}>
        <QuestionsList spacing={3} breakpoints={{ xs:12, md:6, lg:4, xl:3 }}/>
      </Box>
    </React.Fragment>
  );
}
