import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'

import ApiContext from '../api';
import ImageUploadDialog from './image-upload-dialog';
import FileUploadButton from './file-upload-button';


const styles = theme => ({
  flex: {
    display: 'flex',
    flex: 1,
  },
  flexColumn: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'stretch',
    'align-items': 'stretch',
    flex: 1,
  },
  flexBox: {
    display: 'flex',
  },
  flexBoxRight: {
    display: 'flex',
    'justify-content': 'flex-end',
  },
})

class Elements extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleCloseAdd = this.handleCloseAdd.bind(this)
    this.handleImageUploadFileSelected = this.handleImageUploadFileSelected.bind(this)
    this.handleImageUploadDialogChange = this.handleImageUploadDialogChange.bind(this)
    this.handleImageUploadDialogClose = this.handleImageUploadDialogClose.bind(this)
    this.handleImageUploadDialogSubmit = this.handleImageUploadDialogSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  state = {
    elements: [],
    anchorEl: null,
    imageUploadDialog: null,
  }

  handleAddClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseAdd() {
    this.setState({ anchorEl: null });
  }

  handleImageUploadFileSelected(image) {
    this.setState({
      anchorEl: null,
      imageUploadDialog: { image },
    })
  }

  handleImageUploadDialogChange(imageUploadDialog) {
    this.setState({ imageUploadDialog: imageUploadDialog })
  };

  handleImageUploadDialogClose() {
    this.setState({ imageUploadDialog: null })
  };

  async handleImageUploadDialogSubmit({ title, source, image }) {
    const API = this.context;
    let body = new FormData()
    body.append('title', title);
    body.append('source', source);
    body.append('image', image, image.name);
    const results = await API.request('/clipboard/base_elements', {
      method: 'POST',
      body: body,
    })
    if (!results.ok)
      throw Error(`Unexpected image upload status ${results.status}`);
    await this.fetch()
    this.setState({ imageUploadDialog: null })
  }

  async handleRemove(base_element_id) {
    const API = this.context;
    const results = await API.request(`/clipboard/base_elements/${base_element_id}`, {
      method: 'DELETE'
    })
    if (!results.ok)
      throw Error(`Unexpected base element delete status ${results.status}`);
    await this.fetch()
  }

  async fetch() {
    const API = this.context;
    const results = await API.request('/clipboard/base_elements')
    this.setState({ elements: await results.json() })
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    return (
      <Box>
        <Menu
          id="add-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleCloseAdd}
        >
          <MenuItem component={Link} to={'/base_elements/latex/new'}>Добавить LaTeX</MenuItem>
          <MenuItem component={FileUploadButton} accept="image/*" onClick={this.handleCloseAdd} onSuccess={this.handleImageUploadFileSelected}>Добавить фото</MenuItem>
          <MenuItem onClick={this.handleCloseAdd}>Добавить фрагмент PDF</MenuItem>
        </Menu>
        {this.state.imageUploadDialog ? (
          <ImageUploadDialog state={this.state.imageUploadDialog} onChange={this.handleImageUploadDialogChange} onClose={this.handleImageUploadDialogClose} onSubmit={this.handleImageUploadDialogSubmit} />
        ) : (
          <div/>
        )}
        <Grid container spacing={this.props.spacing}>
          <Grid container direction='column' item xs={12}>
            <TextField label="Поиск" variant="outlined" />
          </Grid>
          {this.state.elements.map(({ base_element_id, title, source }) => (
            <Grid container item key={base_element_id} {...this.props.breakpoints}>
              <Card className={this.props.classes.flexColumn}>
                <CardActionArea className={this.props.classes.flexColumn}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      { title }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      { source }
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={this.props.classes.flexBoxRight}>
                  <Button size="small" color="secondary" onClick={()=>this.handleRemove(base_element_id)}>
                    Удалить
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid container item {...this.props.breakpoints}>
            <Card className={this.props.classes.flex}>
              <CardActionArea aria-controls="add-menu" aria-haspopup="true" onClick={this.handleAddClick}>
                <CardContent className={this.props.classes.flexBox}>
                  <AddCircleIcon className={this.props.classes.flex} color="disabled" style={{ fontSize: 120 }}/>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

Elements.contextType = ApiContext;

export default withStyles(styles, { withTheme: true })(Elements)
