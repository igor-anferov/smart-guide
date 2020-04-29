import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import FileUploadButton from './file-upload-button';
import VerifiedTextField from '../verified-text-field';

export default function ({ state, onChange, onClose, onSubmit }) {
  const [titleError, setTitleError] = React.useState('');
  const [sourceError, setSourceError] = React.useState('');

  if (state === null)
    return <div/>;
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {state.dialog_title}
      </DialogTitle>
      <DialogContent>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs={4}>
            <Box pr={2}>
              <Box py={2}>
                <VerifiedTextField
                  autoFocus
                  margin="dense"
                  label="Название элемента"
                  required
                  multiline
                  fullWidth
                  value={state.title}
                  onChange={(newTitle) => onChange({ ...state, title: newTitle })}
                  error={titleError}
                  onErrorChange={setTitleError}
                />
              </Box>
              <Box py={2}>
                <VerifiedTextField
                  margin="dense"
                  label="Источник"
                  required
                  multiline
                  fullWidth
                  value={state.source}
                  onChange={(newSource) => onChange({ ...state, source: newSource })}
                  error={sourceError}
                  onErrorChange={setSourceError}
                />
              </Box>
              <Box py={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.is_pivotal || false}
                      onChange={(event) => onChange({ ...state, is_pivotal: event.target.checked })}
                      color="primary"
                    />
                  }
                  label="Отображать в теормине"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Card>
              <CardActionArea component={FileUploadButton} accept="image/*" onSuccess={(newImage) => onChange({ ...state, image: newImage })}>
                <CardMedia component="img" image={window.URL.createObjectURL(state.image)} />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={() => {
          !state.title && setTitleError('Заполните это поле')
          !state.source && setSourceError('Заполните это поле')
          if (!state.title || !state.source)
            return;
          onSubmit(state)
        }} color="primary" variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
