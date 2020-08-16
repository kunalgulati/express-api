import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import fetch from 'unfetch'

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

import TableTemplate from '../components/TableTemplate';



/* ************************************************* Components ************************************************* */
import NavBar from '../components/NavBar.js'
import StatsBar from '../components/StatsBar.js'
import DisplayPosts from '../components/DisplayPosts.js'

/* ************************************************* Demo Bar ************************************************* */
const useStylesDemoBar = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  hashtagsFormControl: {
    margin: theme.spacing(1),
    minWidth: '30%',
  },
  sortByFormControl: {
    margin: theme.spacing(1),
    minWidth: '15%',
  },
  directionFormControl: {
    margin: theme.spacing(1),
    minWidth: '15%',
  },
  searchButton: {
    minWidth: '15%',
    backgroundColor: '#29BA80',
    color: '#ffffff'
  }
}));

/* ************************************************* Main ************************************************* */

const useStyles = makeStyles((theme) => ({
  demoBarRoot: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  statsBarRoot: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
}));



/** Custom Modules */
export default function Home() {
  const classes = useStyles();
  const [concurrencyData, setConcurrencyData] = React.useState(null);
  const [fetchData, setFetchData] = React.useState(null);
  const [fetchUrl, setFetchUrl] = React.useState(null);

  const calculateTotalTime = (ajaxTime) =>{
    const totalTime = new Date().getTime()-ajaxTime;
    console.log(totalTime)
  };
  /** Check for Success before adding data to caching */
  const fetcher = (url, ajaxTime) => fetch(url)
    .then(r => r.json())
    .then(calculateTotalTime(ajaxTime));

  /** Demo Bar component */
  const DemoBar = () => {
    const classes = useStylesDemoBar();
    const [hashtags, setHashtags] = React.useState('');
    const [sortBy, setSortBy] = React.useState('likes');
    const [direction, setDirection] = React.useState('asc');
    const [concurrentFetchingData, setConcurrentFetching] = React.useState('true');
    /** Checkbox */
    const [hashtagsState, setHashtagsState] = React.useState({
      tech: false,
      startups: false,
      science: false,
      health: false,
      history: false,
      design: false,
      culture: false,
      politics: false,

    });
    /** Fetching */

    const { tech, startups, science, health, history, design, culture, politics } = hashtagsState;

    const handleHashtagsChange = (event) => {
      // if(hashtags == ''){ console.log("wne"); setHashtags(event.target.name)} else{ setHashtags( `${hashtags},${event.target.name}` )  }
      setHashtagsState({ ...hashtagsState, [event.target.name]: event.target.checked });
    };
    const handleSortByChange = (event) => {
      setSortBy(event.target.value);
    };
    const handleDirectionChange = (event) => {
      setDirection(event.target.value);
    };
    const handleConcurrentFetchingChange = (event) =>{
      setConcurrentFetching(event.target.value);
    }

    const handleSearchClick = async () => {
      const tagsArray = [];
      let tagsParam = '';
      setFetchData(null);
      setConcurrencyData(null);
      setFetchUrl(null);

      /** Set the tags */
      for (const key in hashtagsState) { if (hashtagsState[key] == true) { tagsArray.push(key) } }
      if (tagsArray.length != 0) { tagsParam = tagsArray.toString() }

      const url = `https://murmuring-garden-33963.herokuapp.com/api/posts?tags=${tagsParam}&sortBy=${sortBy}&direction=${direction}&concurrentProcess=${concurrentFetchingData}`
      // const url = `http://localhost:4000/api/posts?tags=${tagsParam}&sortBy=${sortBy}&direction=${direction}&concurrentProcess=${concurrentFetchingData}`
      var ajaxTime= new Date().getTime();
      const data = await fetcher(url, ajaxTime)
      
      /** Set Fecthed Data */
      setConcurrencyData("concurrencyDat")
      setFetchData(data)
      setFetchUrl(url);
    }

    return (
      <>
        {/* Hashtings Input */}
        <FormControl variant="filled" className={classes.hashtagsFormControl}>
          <FormGroup>
            <InputLabel id="demo-simple-select-filled-label">Select Atleast one Hashting</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={hashtags}
            >
              <MenuItem value={"tech"}>
                <FormControlLabel
                  control={<Checkbox checked={tech} onChange={handleHashtagsChange} name="tech" />}
                  label="Tech"
                />
              </MenuItem>
              <MenuItem value={"startups"}>
                <FormControlLabel
                  control={<Checkbox checked={startups} onChange={handleHashtagsChange} name="startups" />}
                  label="Start-Ups"
                />
              </MenuItem>
              <MenuItem value={"science"}>
                <FormControlLabel
                  control={<Checkbox checked={science} onChange={handleHashtagsChange} name="science" />}
                  label="Science"
                />
              </MenuItem>
              <MenuItem value={"health"}>
                <FormControlLabel
                  control={<Checkbox checked={health} onChange={handleHashtagsChange} name="health" />}
                  label="Health"
                />
              </MenuItem>
              <MenuItem value={"history"}>
                <FormControlLabel
                  control={<Checkbox checked={history} onChange={handleHashtagsChange} name="history" />}
                  label="History"
                />
              </MenuItem>
              <MenuItem value={"design"}>
                <FormControlLabel
                  control={<Checkbox checked={design} onChange={handleHashtagsChange} name="design" />}
                  label="Design"
                />
              </MenuItem>
              <MenuItem value={"culture"}>
                <FormControlLabel
                  control={<Checkbox checked={culture} onChange={handleHashtagsChange} name="culture" />}
                  label="Culture"
                />
              </MenuItem>
              <MenuItem value={"politics"}>
                <FormControlLabel
                  control={<Checkbox checked={politics} onChange={handleHashtagsChange} name="politics" />}
                  label="Politics"
                />
              </MenuItem>
            </Select>
          </FormGroup>
        </FormControl>

        {/* SortBy Input */}
        <FormControl variant="filled" className={classes.sortByFormControl}>
          <InputLabel id="demo-simple-select-filled-label">SortBy</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <MenuItem value={"id"}>Post Id</MenuItem>
            <MenuItem value={"authorId"}>Author Id</MenuItem>
            <MenuItem value={"likes"}>Likes</MenuItem>
            <MenuItem value={"popularity"}>Popularity</MenuItem>
            <MenuItem value={"reads"}>Reads</MenuItem>
          </Select>
        </FormControl>
        {/* Direction Input */}
        <FormControl variant="filled" className={classes.directionFormControl}>
          <InputLabel id="demo-simple-select-filled-label">Direction</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={direction}
            onChange={handleDirectionChange}
          >
            <MenuItem value={"asc"}>Ascending</MenuItem>
            <MenuItem value={"desc"}>Descending</MenuItem>
          </Select>
        </FormControl>
        {/* Concurrent Fetching  */}
        <FormControl variant="filled" className={classes.directionFormControl}>
          <InputLabel id="demo-simple-select-filled-label">Concurrently Fetch Data</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={concurrentFetchingData}
            onChange={handleConcurrentFetchingChange}
          >
            <MenuItem value={"true"}>True</MenuItem>
            <MenuItem value={"false"}>False</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" className={classes.searchButton} onClick={handleSearchClick}>
          <Typography>Search</Typography></Button>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Grid container
        alignItems="center"
        justify="center"
        className={classes.demoBarRoot}>
        <DemoBar />
      </Grid>
      <StatsBar
        concurrentFetchingArgs={"cachingData"}
        url={fetchUrl}
      />
      <Divider/>
      <TableTemplate
        data={fetchData}
/>
      {/* <DisplayPosts  */}
        {/* data={fetchData} */}
      {/* /> */}
    </>
  )
}
