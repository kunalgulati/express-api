const express = require('express');
const helperPost = require('../lib/helper/posts');

const router = express.Router();

/** 
 * Router-1 
 * api/ping
*/
router.get('/api/ping', (req, res) => {
  const returnObj = { "success": true }
  /** Allow being catched for 8 mins */ 
  res.set('Cache-Control', 'public, max-age=600');
  return res.send(returnObj);
})

/** 
 * Router-2 
 * api/posts
*/
router.get('/api/posts', async (req, res) => {
  /** Check and return if some value for specified paramter was paased, Otherwise, return default */
  const sortByParam = (req.query.sortBy || 'id').toLowerCase();
  const directionParam = (req.query.direction || 'asc').toLowerCase();
  const concurrentProcessParam = (req.query.concurrentProcess || "true");
  let tagsParam = req.query.tags;

  /** Validate user-passed Parameters */
  if (!helperPost.validateTags(tagsParam)) { res.status(400); return res.send({ "error": "Tags parameter is required" }) }
  if (!helperPost.validateSortBy(sortByParam)) { res.status(400); return res.send({ "error": "sortBy parameter is invalid" }) }
  if (!helperPost.validateDirection(directionParam)) { res.status(400); return res.send({ "error": "direction parameter is invalid" }) }

  /** Convert to lower case to ensure no client-side error && Split the tags into array */
  tagsParam = tagsParam.toLowerCase();
  tagsParam = helperPost.tagsArgSplit(tagsParam);

  /* Fetch all data */
  let result = [];
  if(concurrentProcessParam == "true"){ result = await helperPost.getAllTagsDataConcurrently(tagsParam)}
  else {result = await helperPost.getAllTagsDataNotConcurrently(tagsParam);}
  

  if(result === null) { res.status(400); return res.send({ "error": "There was a error in fetching the data from server. Please contact our support team" }) }
  /** Remove duplicates / Combine Fetched Data */
  const combineData = await helperPost.removeDuplicates(result);
  /** Sort the combined data using "SortedBy" and "Direction" argument passed in the Query String*/
  const sortedData = await helperPost.sortData(directionParam, sortByParam, combineData);
  /** Create a JSON return objected with the fetchd data */
  const returnObj = { posts: sortedData };
  
  /** If everything was successfull */
  /** allow being cached for 10 mins */ 
  res.set('Cache-Control', 'public, max-age=600');
  return res.send(returnObj);
})

module.exports = router;
