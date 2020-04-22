import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
  flexBox: {
    display: 'flex',
  },
})

class Elements extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleCloseAdd = this.handleCloseAdd.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.handleImageUploadDialogClose = this.handleImageUploadDialogClose.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  state = {
    elements: [],
    anchorEl: null,
    imageToUpload: null,
  }

  handleAddClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseAdd() {
    this.setState({ anchorEl: null });
  }

  handleImageUpload(image) {
    this.setState({
      anchorEl: null,
      imageToUpload: image,
    })
  }

  handleImageUploadDialogClose() {
    this.setState({ imageToUpload: null })
  };

  async fetch() {
    let API = this.context;
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
          <MenuItem component={FileUploadButton} accept="image/*" onClick={this.handleCloseAdd} onSuccess={this.handleImageUpload}>Добавить фото</MenuItem>
          <MenuItem onClick={this.handleCloseAdd}>Добавить фрагмент PDF</MenuItem>
        </Menu>
        <ImageUploadDialog image={this.state.imageToUpload} onImageUpdate={this.handleImageUpload} onClose={this.handleImageUploadDialogClose} />
        <Grid container spacing={this.props.spacing}>
          <Grid container direction='column' item xs={12}>
            <TextField label="Поиск" variant="outlined" />
          </Grid>
          {this.state.elements.map(({ base_element_id, title, source }) => (
            <Grid container item key={base_element_id} {...this.props.breakpoints}>
              <Card className={this.props.classes.flex}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      { title }
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      { source }
                    </Typography>
                  </CardContent>
                </CardActionArea>
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
