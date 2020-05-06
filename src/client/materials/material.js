import React from 'react'
import { withStyles } from '@material-ui/core/styles';
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
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import RestoreIcon from '@material-ui/icons/Restore';
import SaveIcon from '@material-ui/icons/Save';
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
import { mergeWith, isEqual, isArray } from 'lodash';

import BaseElements from '../base_elements/list'

import commonStyles from '../styles';
import VerifiedTextField from '../verified-text-field';
import ApiContext from '../api';
import Tags from '../tags';

const drawerWidth = 320;

function merge(a, b) {
  return mergeWith({}, a, b, (objValue, srcValue) => {
    if (isArray(objValue))
      return srcValue;
  })
}

function diff(a, b) {
  return Object.fromEntries(Object.entries(a).filter(([k, v]) => !Object.keys(b).includes(k) || !isEqual(v, b[k])))
}

const styles = theme => ({
  ...commonStyles(theme),

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
})


class Material extends React.Component {
  state = {
    leftOpen: true,
    rightOpen: true,
    titleError: '',
    leftDrawerContent: {
      initial: {
        title: '',
        tags: [],
      },
      current: {
        title: '',
        tags: [],
      },
    },
    base_elements: [],
  }

  constructor(props) {
    super(props)
    this.handleLeftDrawer = this.handleLeftDrawer.bind(this)
    this.handleRightDrawer = this.handleRightDrawer.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onTagsChange = this.onTagsChange.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onSave = this.onSave.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  handleLeftDrawer() {
    this.setState({
      leftOpen: !this.state.leftOpen,
    })
  }

  handleRightDrawer() {
    this.setState({
      rightOpen: !this.state.rightOpen,
    })
  }

  onTitleChange(title) {
    this.setState({
      leftDrawerContent: merge(this.state.leftDrawerContent, {current: {title}})
    })
  }

  onTagsChange(tags) {
    this.setState({
      leftDrawerContent: merge(this.state.leftDrawerContent, {current: {tags}})
    })
  }

  showSuccessfullySavedMessage() {
    if (this.state.showSuccessfullySavedMessage)
      clearTimeout(this.state.showSuccessfullySavedMessage)
    this.setState({
      showSuccessfullySavedMessage: setTimeout(() => this.setState({ showSuccessfullySavedMessage: undefined }), 4000)
    })
  }

  onReset() {
    this.setState({
      leftDrawerContent: merge(this.state.leftDrawerContent, {current: this.state.leftDrawerContent.initial})
    })
  }

  async onSave() {
    const API = this.context;
    const results = await API.request(`/materials/${this.props.match.params.material_id}`, {
      method: 'POST',
      body: new URLSearchParams(diff(this.state.leftDrawerContent.current, this.state.leftDrawerContent.initial))
    })
    if (results.ok) {
      this.setState({
        leftDrawerContent: merge(this.state.leftDrawerContent, {initial: this.state.leftDrawerContent.current})
      })
      this.showSuccessfullySavedMessage()
    }
  }

  async fetch() {
    const API = this.context;
    const results = await API.request(`/materials/${this.props.match.params.material_id}`)
    const {title, tags, base_elements} = await results.json()
    this.setState({
      base_elements,
    })
    if (isEqual(this.state.leftDrawerContent.initial, this.state.leftDrawerContent.current))
      this.setState({
        leftDrawerContent: {
          initial: {title, tags: [...tags]},
          current: {title, tags: [...tags]},
        },
      })
  }

  async onDrop({ removedIndex, addedIndex }) {
    const moved_base_element_id = this.state.base_elements[removedIndex].base_element_id
    this.setState({
      base_elements: arrayMove(this.state.base_elements, removedIndex, addedIndex)
    })
    const API = this.context;
    const results = await API.request(
      `/materials/${
        this.props.match.params.material_id
      }/base_elements/${
        moved_base_element_id
      }/move`, {
      method: 'POST',
      body: new URLSearchParams({ position: addedIndex }),
    })
    if (!results.ok)
      throw Error(`Failed to move base element inside material: ${results.status}`)
    await this.fetch()
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    const { classes } = this.props

    return (
      <div className={clsx(classes.fullHeight, classes.flex)}>
        <CssBaseline />
        <Fab className={classes.fab} color="primary">
          <DoneIcon />
        </Fab>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.leftOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={clsx(classes.drawerHeader, classes.drawerHeaderLeft)}>
            <IconButton onClick={this.handleLeftDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Box className={classes.drawerContent}>
            <Box p={2}>
              <Box py={2}>
                <VerifiedTextField
                  autoFocus
                  margin="dense"
                  label="Название учебного материала"
                  required
                  multiline
                  fullWidth
                  value={this.state.leftDrawerContent.current.title}
                  onChange={this.onTitleChange}
                  error={this.state.titleError}
                  onErrorChange={titleError => this.setState({titleError})}
                />
              </Box>
              <Box py={2}>
                <Tags
                  value={this.state.leftDrawerContent.current.tags}
                  onChange={this.onTagsChange}
                />
              </Box>
              <Box pt={5}>
                <Grid container spacing={1} justify="flex-end">
                  <Grid item>
                    <Button
                      startIcon={<RestoreIcon/>}
                      variant="outlined"
                      color="default"
                      disabled={isEqual(this.state.leftDrawerContent.initial, this.state.leftDrawerContent.current)}
                      onClick={this.onReset}
                    >
                      Отменить изменения
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<SaveIcon/>}
                      variant="contained"
                      color="primary"
                      disabled={isEqual(this.state.leftDrawerContent.initial, this.state.leftDrawerContent.current)}
                      onClick={this.onSave}
                    >
                      Сохранить изменения
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box pt={5}>
                <Fade in={Boolean(this.state.showSuccessfullySavedMessage)}>
                  <Alert variant="outlined" severity="success">
                    Изменения успешно сохранены!
                  </Alert>
                </Fade>
              </Box>
            </Box>
          </Box>
        </Drawer>
        <div
          className={clsx(classes.flexCol, {
            [classes.mainLeftClosed]: !this.state.leftOpen,
            [classes.mainLeftOpened]: this.state.leftOpen,
            [classes.mainRightClosed]: !this.state.rightOpen,
            [classes.mainRightOpened]: this.state.rightOpen,
          })}
        >
          <Grid item>
            <AppBar position="relative">
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleLeftDrawer}
                  edge="start"
                  className={clsx(classes.leftMenuButton, this.state.leftOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.flex} variant="h6" color="inherit" noWrap>
                  Редактирование учебного элемента
                </Typography>
                <IconButton
                  color="inherit"
                  onClick={this.handleRightDrawer}
                  edge="start"
                  className={clsx(classes.rightMenuButton, this.state.rightOpen && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Grid>
          <Container dragHandleSelector=".drag-handle" onDrop={this.onDrop} dropPlaceholder={{className: 'dnd-drop-placeholder'}} groupName="base_elements" render={(ref) => (
            <List className={classes.fullHeight} ref={ref}>
              {this.state.base_elements.map(({ base_element_id, title }) => (
                <Draggable key={base_element_id}>
                  <ExpansionPanel>
                    <ExpansionPanelSummary className="drag-handle"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Grid container wrap='nowrap' alignItems='center'>
                        <ExpansionPanelActions
                          style={{cursor: 'move'}}
                        >
                          <ListItemIcon>
                            <DragHandleIcon />
                          </ListItemIcon>
                        </ExpansionPanelActions>
                        <Typography>
                          {title}
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
            </List>
          )}/>
        </div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={this.state.rightOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={clsx(classes.drawerHeader, classes.drawerHeaderRight)}>
            <IconButton onClick={this.handleRightDrawer}>
              <ChevronRightIcon />
            </IconButton>
            <Typography className={classes.flex} variant="h6" color="inherit" noWrap>
              Базовые элементы
            </Typography>
          </div>
          <Divider />
          <Box className={classes.drawerContent}>
            <Box p={2}>
              <BaseElements spacing={2}/>
            </Box>
          </Box>
        </Drawer>
      </div>
    );
  }
}

Material.contextType = ApiContext;

export default withStyles(styles, { withTheme: true })(Material)
