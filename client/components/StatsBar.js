import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing(1),
  },
  gridItem: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    // height: '100%'
  },
  linkClass: {
    color: theme.palette.text.secondary,
  }
}));

export default function StatsGrid(props) {
  const classes = useStyles();

  if(props.concurrentArgs === null || props.url ===  null){
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
            <Typography><b>Fetching Mode: </b>{props.concurrentArgs}</Typography>
            <Typography><b>Fetching Time: </b>{props.responseTime} Milliseconds</Typography>
            <br />
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <Typography><b>API Link: </b> </Typography>
            <Typography>
              <Link href={props.url} className={classes.linkClass}>{props.url}</Link>
            </Typography>
          </Paper>
        </Grid>

        {/* <Grid item xs={6} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <Typography>Caching Fetching Status</Typography>
            <Typography>Was it reterieved from Cache: {"yes"}</Typography>
            <Typography>Load Time: {"12ms"}</Typography>
          </Paper>
        </Grid> */}
      </Grid>
    </>
  );
}
