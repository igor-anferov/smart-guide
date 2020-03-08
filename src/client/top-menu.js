import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useRouteMatch } from "react-router-dom";

export default function TopMenu() {
  return (
    <AppBar position="static">
      <Tabs value={true} variant="fullWidth">
        <Tab value={useRouteMatch('/exams') !== null} component={Link} to='/exams' label="Экзамены"/>
        <Tab value={useRouteMatch('/questions') !== null} component={Link} to='/questions' label="Вопросы"/>
        <Tab value={useRouteMatch('/materials') !== null} component={Link} to='/materials' label="Учебные материалы"/>
        <Tab value={useRouteMatch('/base_elements') !== null} component={Link} to='/base_elements' label="Базовые элементы"/>
      </Tabs>
    </AppBar>
  );
}
