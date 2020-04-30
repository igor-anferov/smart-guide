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
import { Link } from 'react-router-dom'

import ApiContext from '../api';


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

class Materials extends React.Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  state = {
    elements: [],
  }

  async handleRemove(material_id) {
    const API = this.context;
    const results = await API.request(`/clipboard/materials/${material_id}`, {
      method: 'DELETE'
    })
    if (!results.ok)
      throw Error(`Unexpected material delete status ${results.status}`);
    await this.fetch()
  }

  async fetch() {
    const API = this.context;
    const results = await API.request('/clipboard/materials')
    this.setState({ elements: await results.json() })
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    return (
      <Box>
        <Grid container spacing={this.props.spacing}>
          <Grid container direction='column' item xs={12}>
            <TextField label="Поиск" variant="outlined" />
          </Grid>
          {this.state.elements.map((item) => (
            <Grid container item key={item.material_id} {...this.props.breakpoints}>
              <Card className={this.props.classes.flexColumn}>
                <CardActionArea component={Link} to={`/materials/${item.material_id}/edit`} className={this.props.classes.flexColumn}>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      { item.title }
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={this.props.classes.flexBoxRight}>
                  <Button size="small" color="secondary" onClick={()=>this.handleRemove(item.material_id)}>
                    Удалить
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid container item {...this.props.breakpoints}>
            <Card className={this.props.classes.flex}>
              <CardActionArea component={Link} to={`/materials/new`}>
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

Materials.contextType = ApiContext;

export default withStyles(styles, { withTheme: true })(Materials)
