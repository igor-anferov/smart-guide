import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import TopMenu from '../top-menu';
import ElementsList from './list';

export default function () {
  return (
    <React.Fragment>
      <CssBaseline/>
      <TopMenu/>
      <Box p={8}>
        <ElementsList spacing={3} breakpoints={{ xs:12, sm:6, md:4, lg:3, xl:2 }}/>
      </Box>
    </React.Fragment>
  );
}
