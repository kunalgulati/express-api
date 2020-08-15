import React from 'react';
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


const useStyles = makeStyles((theme) => ({
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

const fetcher = url => fetch(url).then(r => r.json())

const DemoBar = () => {
  const classes = useStyles();
  const [hashtags, setHashtags] = React.useState('');
  const [sortBy, setSortBy] = React.useState('likes');
  const [direction, setDirection] = React.useState('asc');
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

  const handleSearchClick = async () => {
    const tagsArray = [];
    let tagsParam = '';

    /** Set the tags */
    for (const key in hashtagsState) { if (hashtagsState[key] == true) { tagsArray.push(key) } }
    if (tagsArray.length != 0) { tagsParam = tagsArray.toString() }
    
    const url = `https://murmuring-garden-33963.herokuapp.com/api/posts?tags=${tagsParam}&sortBy=${sortBy}&direction=${direction}`
    const data = await fetcher(url)
    console.log(data);

    console.log(url);
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
      {/* SortBy Input */}
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
      <Button variant="contained" className={classes.searchButton} onClick={handleSearchClick}>
        <Typography>Search</Typography></Button>

    </>
  );
}
