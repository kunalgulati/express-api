import React from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

/** Icons */
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  rootBar :{
    backgroundColor: "transparent",
    color: "#0336FF",
    alignItems: 'center',

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    color: 'primary',
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  titleLinkedin:{
    flexGrow: 1,
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    color: '#0e76a8',
    padding: theme.spacing(2)
  },
  titleGit:{
    flexGrow: 1,
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    color: '#000000',
    padding: theme.spacing(2),
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const router = useRouter();

  const handleHomeClick = (e)=>{
    e.preventDefault();
    router.push('./')
  }

  return (
    <React.Fragment>

    <div className={classes.root}>
      <AppBar position="static" className={classes.rootBar} elevation={0}>
        <Toolbar>
          <Button color="inherit" onClick={handleHomeClick}>
            <Typography variant="h4" component="h4" className={classes.title}><b>{"Demo"}</b></Typography>
          </Button>
          <Button color="inherit" target="_blank" href="https://medium.com/@kunalgulati98/concurrent-api-fetching-f1131c0a916b">
            <Typography variant="h4" component="h4" className={classes.title}> <b>{"Description"}</b></Typography>
          </Button>
          <IconButton  target="_blank" href="https://github.com/kunalgulati/express-api" className={classes.titleGit}> 
            <GitHubIcon /> 
          </IconButton>
          <IconButton  target="_blank" href="https://www.linkedin.com/in/kunal-gulati-a02b1b5b/" className={classes.titleLinkedin}>
            <LinkedInIcon /> 
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    </React.Fragment>
  );
}
