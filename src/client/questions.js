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


const questions = [
  {
    id: 1,
    question: 'Линейное пространство над произвольным полем. Ранг и база системы векторов',
  },
  {
    id: 2,
    question: 'Корневые подпространства. Расщепление линейного пространства в прямую сумму корневых подпространств',
  },
  {
    id: 3,
    question: 'Линейный оператор в нормированных пространствах. Непрерывность и ограниченность. Норма линейного оператора',
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

export default function Questions({ spacing, breakpoints }) {
  const classes = useStyles();

  return (
    <Grid container spacing={spacing}>
      <Grid container direction='column' item xs={12}>
        <TextField label="Поиск" variant="outlined" />
      </Grid>
      {questions.map(({ id, question }) => (
        <Grid container item key={id} { ...breakpoints }>
          <Card className={classes.flex}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6">
                  { question }
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid container item { ...breakpoints }>
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
