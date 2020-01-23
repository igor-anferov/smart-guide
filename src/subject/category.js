import React, { useState } from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';

export default function Category({ id, title, items }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText primary={title} primaryTypographyProps={{variant: 'h6'}}/>
      </ListItem>
      <Container p={2}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items.map(({ id, title }) => (
              <ListItem button>
                <ListItemText primary={ title } />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Container>
    </React.Fragment>
  );
}
