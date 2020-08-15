import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing(1),
  },
  gridItem: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));


export default function DisplayAPIUrlGrid(props) {
  // console.log(props)

  /** If nothing fetched yet or error returned by the url, then retunr empty component */
  if (props.url === null) {
    return <></>;
  }

  const classes = useStyles();
  const url = props.url;

  return (
    <>
      <Grid container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid key={"linkGrid"} item xs={12} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <Typography>Link:</Typography>
            <Typography>{url}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
