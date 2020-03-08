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
import { Link } from 'react-router-dom'


const exams = [
  {
    id: 1,
    title: 'Линейная алгебра и аналитическая геометрия',
    professor: 'Ким Галина Динховна',
  },
  {
    id: 2,
    title: 'Математический анализ',
    professor: 'Ломов Игорь Сергеевич',
  },
  {
    id: 3,
    title: 'Системы программирования',
    professor: 'Волкова Ирина Анатольевна',
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

export default function Exams({spacing, breakpoints}) {
  const classes = useStyles();

  return (
    <Grid container spacing={spacing}>
      <Grid container direction='column' item xs={12}>
        <TextField label="Поиск" variant="outlined" />
      </Grid>
      {exams.map(({ id, title, professor }) => (
        <Grid container item key={id} {...breakpoints}>
          <Card className={classes.flex}>
            <CardActionArea component={Link} to='/exams/exam'>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  { title }
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  { professor }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid container item {...breakpoints}>
        <Card className={classes.flex}>
          <CardActionArea>
            <Link to='/exams/exam'>
              <CardContent className={classes.flexBox}>
                <AddCircleIcon className={classes.flex} color="disabled" style={{ fontSize: 120 }}/>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
