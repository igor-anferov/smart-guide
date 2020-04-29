import React, { useState } from 'react'
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import DragHandleIcon from "@material-ui/icons/DragHandle";

import commonStyles from '../styles';
import Questions from '../questions/list'

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    flex: 1,
  },
  flexBox: {
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  leftMenuButton: {
    marginRight: theme.spacing(2),
  },
  rightMenuButton: {
    marginLeft: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  drawerHeaderLeft: {
    justifyContent: 'flex-end',
  },
  drawerHeaderRight: {
    justifyContent: 'flex-start',
  },
  drawerContent: {
    height: '100%',
    overflow: 'auto',
  },
  mainLeftClosed: {
    marginLeft: -drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainLeftOpened: {
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainRightClosed: {
    marginRight: -drawerWidth,
    width: `calc(100% + ${2 * drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainRightOpened: {
    marginRight: 0,
    width: `calc(100% + ${2 * drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const useCommonStyles = makeStyles(commonStyles)

function LeftDrawerContent() {
  const classes = useStyles();

  return (
    <Box p={2}>
      <Box py={2}>
        <TextField fullWidth className={classes.flex} id="title" required={true} multiline={true} label="Название экзамена" />
      </Box>
      <Box py={2}>
        <TextField fullWidth className={classes.flex} id="professor" multiline={true} label="Преподаватель" />
      </Box>
    </Box>
  );
}

function RightDrawerContent() {
  return (
    <Box p={2}>
      <Questions spacing={2}/>
    </Box>
  );
}

function MainContent() {
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
    <List>
      <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
        {items.map(({ id, text }) => (
          <Draggable key={id}>
            <ExpansionPanel>
              <ExpansionPanelSummary className="drag-handle"
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <Grid container wrap='nowrap' alignItems='center'>
                  <ExpansionPanelActions>
                    <ListItemIcon>
                      <DragHandleIcon />
                    </ListItemIcon>
                  </ExpansionPanelActions>
                  <Typography>
                    {text}
                  </Typography>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary">
                  The click event of the nested action will propagate up and expand the panel unless you explicitly stop it.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Draggable>
        ))}
      </Container>
    </List>
  );
}

export default function Exam() {
  const classes = useStyles();
  const commonStyles = useCommonStyles();
  const theme = useTheme();
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);

  const handleLeftDrawer = () => {
    setLeftOpen(!leftOpen);
  };

  const handleRightDrawer = () => {
    setRightOpen(!rightOpen);
  };

  return (
    <div className={classes.flex}>
      <CssBaseline />
      <Fab className={classes.fab} color="primary">
        <DoneIcon />
      </Fab>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={leftOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={clsx(classes.drawerHeader, classes.drawerHeaderLeft)}>
          <IconButton onClick={handleLeftDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Box className={classes.drawerContent}>
          <LeftDrawerContent/>
        </Box>
      </Drawer>
      <div
        className={clsx(commonStyles.flexCol, {
          [classes.mainLeftClosed]: !leftOpen,
          [classes.mainLeftOpened]: leftOpen,
          [classes.mainRightClosed]: !rightOpen,
          [classes.mainRightOpened]: rightOpen,
        })}
      >
        <Grid item>
          <AppBar position="relative">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="leftOpen drawer"
                onClick={handleLeftDrawer}
                edge="start"
                className={clsx(classes.leftMenuButton, leftOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.flex} variant="h6" color="inherit" noWrap>
                Экзамен
              </Typography>
              <IconButton
                color="inherit"
                aria-label="rightOpen drawer"
                onClick={handleRightDrawer}
                edge="start"
                className={clsx(classes.rightMenuButton, rightOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        <MainContent/>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={rightOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={clsx(classes.drawerHeader, classes.drawerHeaderRight)}>
          <IconButton onClick={handleRightDrawer}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
            <Typography className={classes.flex} variant="h6" color="inherit" noWrap>
              Вопросы
            </Typography>
        </div>
        <Divider />
        <Box className={classes.drawerContent}>
          <RightDrawerContent/>
        </Box>
      </Drawer>
    </div>
  );
}
