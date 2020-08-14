import Head from 'next/head'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


import NavBar from '../components/NavBar.js'
import DemoBar from '../components/DemoBar.js'

const useStyles = makeStyles((theme) => ({
  demoBarRoot: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
}));

/** Custom Modules */
export default function Home() {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Grid container 
        alignItems="center"
        justify="center"
        className={classes.demoBarRoot}>
        <DemoBar />
      </Grid>
    </>
  )
}
