import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Exams from './exams';
import Questions from './questions';
import Materials from './materials';
import Elements from './elements';


export default function Start() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
    <CssBaseline/>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Экзамены"/>
          <Tab label="Вопросы"/>
          <Tab label="Учебные материалы"/>
          <Tab label="Базовые элементы"/>
        </Tabs>
      </AppBar>
      <Box hidden={value !== 0} p={8}>
        <Exams spacing={3} breakpoints={{ xs:12, sm:6, md:4, lg:3, xl:2 }}/>
      </Box>
      <Box hidden={value !== 1} p={8}>
        <Questions spacing={3} breakpoints={{ xs:12, md:6, lg:4, xl:3 }}/>
      </Box>
      <Box hidden={value !== 2} p={8}>
        <Materials spacing={3} breakpoints={{ xs:12, md:6, lg:4, xl:3 }}/>
      </Box>
      <Box hidden={value !== 3} p={8}>
        <Elements spacing={3} breakpoints={{ xs:12, sm:6, md:4, lg:3, xl:2 }}/>
      </Box>
    </React.Fragment>
  );
}
