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
  hashtagPaper: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: 'white',
    marginLeft: "5px",
    backgroundColor: '#29BA80'
  }
}));


export default function DisplayPostsGrid(props) {
  /** If nothing fetched yet or error returned by the url, then retunr empty component */
  if (props.data === null) {
    return <></>;
  }

  const classes = useStyles();
  const postsData = props.data.posts || [1, 2, 3];

  return (
    <>
      <Grid container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        {
          postsData.map((post) => (
            <Grid key={"post-" + post.id} item xs={6} className={classes.gridItem}>
              <Paper className={classes.paper}>
                <Typography>Author Id: {post.authorId}</Typography>
                <Typography>Post Id: {post.id}</Typography>
                <Typography>Likes: {post.likes}</Typography>
                <Typography>Popularity Score: {post.popularity}</Typography>
                <Typography>Total Reads: {post.reads}</Typography>

                <Grid container
                  alignItems="center"
                  justify="center"
                  className={classes.root}
                >
                  {
                    post.tags.map((tag) => (
                      <Grid key={`tag-${tag}-${post.id}`} item xs={3}>
                        <Paper className={classes.hashtagPaper}>
                          <Typography>#{tag}</Typography>
                        </Paper>
                      </Grid>
                    ))
                  }
                </Grid>

              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </>
  );
}
