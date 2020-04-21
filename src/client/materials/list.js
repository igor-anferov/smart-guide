import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const materials = [
  {
    id: 1,
    title: 'Определение линейного пространства',
    snippet: 'Мн-во с заданными на нём нутренним и внешним законами композиции'
  },
  {
    id: 2,
    title: 'Теорема о неполном базисе',
    snippet: 'В n-мерном пространстве любую линейно-независимую систему из k, где k < n, векторов можно дополнить до базиса'
  },
  {
    id: 3,
    title: 'Теорема о линейной оболочке',
    snippet: 'Линейная оболочка над векторами линейного пространства является его подпространством'
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

export default function Materials({spacing, breakpoints}) {
  const classes = useStyles();

  return (
    <Grid container spacing={spacing}>
      <Grid container direction='column' item xs={12}>
        <TextField label="Поиск" variant="outlined" />
      </Grid>
      {materials.map(({ id, title, snippet }) => (
        <Grid container item key={id} {...breakpoints}>
          <Card className={classes.flex}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  { title }
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  { snippet }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
        <Grid container item {...breakpoints}>
        <Card className={classes.flex}>
          <CardActionArea>
            <CardContent className={classes.flexBox}>
              <AddCircleIcon className={classes.flex} color="disabled" style={{ fontSize: 120 }}/>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
