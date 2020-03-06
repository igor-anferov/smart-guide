import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragHandleIcon from "@material-ui/icons/DragHandle";


export default function CardList() {
  const [items, setItems] = useState([
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
    { id: "4", text: "Item 4" }
  ]);

  const onDrop = ({ removedIndex, addedIndex }) => {
    setItems(items => arrayMove(items, removedIndex, addedIndex));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container direction='column' wrap='nowrap'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6">
              "%name%"
            </Typography>
          </Toolbar>
        </AppBar>
        <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
          {items.map(({ id, text }) => (
            <Draggable key={id}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  className='drag-handle'
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container alignItems='center' wrap='nowrap'>
                    <ExpansionPanelActions>
                      <ListItemIcon>
                        <DragHandleIcon/>
                      </ListItemIcon>
                    </ExpansionPanelActions>
                    <Typography>
                      { text }
                    </Typography>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Draggable>
          ))}
        </Container>
      </Grid>
    </React.Fragment>
  );
}
