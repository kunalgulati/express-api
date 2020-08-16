import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  rootTable: {
    width: '80%',
    height: '800px',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    marginBottom: '5%'
  },
  container: {
    maxHeight: 800,
    alignContent: "center",
  },
  // Table aftr
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
    // color: theme.palette.text.secondary,
  },
  hashtagPaper: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: 'white',
    marginLeft: "5px",
    backgroundColor: '#29BA80'
  }
}));

export default function StickyHeadTable(props) {
  if (props.data === null) {
    return <></>;
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = props.data.posts;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.rootTable}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          {/* <TableHead>
            <TableRow>
              <TableCell>
                <Typography alignItems="center"><b>Post</b></Typography>
              </TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell>
                    <Grid justify="center" key={"row-" + row.id} item xs={8} className={classes.gridItem}>
                      <Paper className={classes.paper}>
                        <Typography ><b>Author Id: </b> {row.authorId} </Typography>
                        <Typography><b>row Id:</b> {row.id}</Typography>
                        <Typography><b>Likes:</b> {row.likes}</Typography>
                        <Typography><b>Popularity Score:</b> {row.popularity}</Typography>
                        <Typography><b>Total Reads:</b> {row.reads}</Typography>

                        <Grid container
                          alignItems="center"
                          justify="center"
                          className={classes.root}
                        >
                          {
                            row.tags.map((tag) => (
                              <Grid key={`tag-${tag}-${row.id}`} item xs={3}>
                                <Paper className={classes.hashtagPaper}>
                                  <Typography>#{tag}</Typography>
                                </Paper>
                              </Grid>
                            ))
                          }
                        </Grid>
                      </Paper>
                    </Grid>

                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
