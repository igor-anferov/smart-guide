import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import FileUploadButton from './file-upload-button';


export default function ({ image, onImageUpdate, onClose }) {
  if (image === null)
    return (<div/>);
  return (
    <Dialog open={Boolean(image)} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Новый базовый элемент
      </DialogTitle>
      <DialogContent>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs={4}>
            <Box pr={2}>
              <TextField autoFocus margin="dense" label="Название элемента" required multiline fullWidth />
              <TextField autoFocus margin="dense" label="Источник" required multiline fullWidth />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Card>
              <CardActionArea component={FileUploadButton} accept="image/*" onSuccess={onImageUpdate}>
                <CardMedia component="img" image={window.URL.createObjectURL(image)} />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
