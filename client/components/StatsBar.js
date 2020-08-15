import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

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

export default function StatsGrid(props) {
  const classes = useStyles();
  console.log(props)

  console.log(typeof(props.cachingArgs) , " s s ", props.concurrentFetchingArgs)

  if(props.concurrentFetchingArgs === null || props.cachingArgs ===  null){
    return <></>;
  }

  return (
    <>
      <Grid container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item xs={6} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <Typography>Concurrent API Fetching Status </Typography>
            <Typography>Fetching Mode: {"Concurrent"}</Typography>
            <Typography>Load Time: {"12ms"}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <Typography>Caching Fetching Status</Typography>
            <Typography>Was it reterieved from Cache: {"yes"}</Typography>
            <Typography>Load Time: {"12ms"}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
