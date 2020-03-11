import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { Link, useRouteMatch } from 'react-router-dom'

import ImageUploadDialog from './image-upload-dialog';
import FileUploadButton from './file-upload-button';


const elements = [
  {
    id: 1,
    title: 'Теорема Лапласа (формулировка)',
    source: 'Ильин, Ким. — Линейная алгебра и аналитическая геометрия',
  },
  {
    id: 2,
    title: 'Теорема Лапласа (доказательство)',
    source: 'Ильин, Ким. — Линейная алгебра и аналитическая геометрия',
  },
  {
    id: 3,
    title: 'Архитектура фон Неймана',
    source: 'Баула. — Архитектура ЭВМ и язык Ассемблера',
  },
]

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    flex: 1,
  },
  flexBox: {
    display: 'flex',
  },
}))

export default function Elements({spacing, breakpoints}) {
  let match = useRouteMatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [imageToUpload, setImageToUpload] = React.useState(null);
  const handleImageUpload = (image) => {
    setAnchorEl(null);
    setImageToUpload(image);
  };
  const handleImageUploadDialogClose = () => {
    setImageToUpload(null);
  };


  return (
    <Box>
      <Menu
        id="add-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={`${match.url}/latex/new`}>Добавить LaTeX</MenuItem>
        <MenuItem component={FileUploadButton} accept="image/*" onClick={handleClose} onSuccess={handleImageUpload}>Добавить фото</MenuItem>
        <MenuItem onClick={handleClose}>Добавить фрагмент PDF</MenuItem>
      </Menu>
      <ImageUploadDialog image={imageToUpload} onImageUpdate={handleImageUpload} onClose={handleImageUploadDialogClose} />
      <Grid container spacing={spacing}>
        <Grid container direction='column' item xs={12}>
          <TextField label="Поиск" variant="outlined" />
        </Grid>
        {elements.map(({ id, title, source }) => (
          <Grid container item key={id} {...breakpoints}>
            <Card className={classes.flex}>
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
        <Grid container item {...breakpoints}>
          <Card className={classes.flex}>
            <CardActionArea aria-controls="add-menu" aria-haspopup="true" onClick={handleClick}>
              <CardContent className={classes.flexBox}>
                <AddCircleIcon className={classes.flex} color="disabled" style={{ fontSize: 120 }}/>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
