const express = require('express');
const helperPost = require('../lib/helper/posts');

const router = express.Router();

/** 
 * Router-1 
 * api/ping
*/
router.get('/api/ping', (req, res) => {
  const returnObj = { "success": true }
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
  let tagsParam = req.query.tags;

  /** Validate user-passed Parameters */
  if (!helperPost.validateTags(tagsParam)) { return res.send({ "error": "Tags parameter is required" }) }
  if (!helperPost.validateSortBy(sortByParam)) { return res.send({ "error": "sortBy parameter is invalid" }) }
  if (!helperPost.validateDirection(directionParam)) { return res.send({ "direction": "direction parameter is invalid" }) }

  /** Convert to lower case to ensure no client-side error && Split the tags into array */
  tagsParam = tagsParam.toLowerCase();
  tagsParam = helperPost.tagsArgSplit(tagsParam);

  /* Fetch all data */
  const result = await helperPost.getAllTagsData(tagsParam);
  /** Remove duplicates / Combine Fetched Data */
  const combineData = await helperPost.removeDuplicates(result);
  /** Sort the combined data using "SortedBy" and "Direction" argument passed in the Query String*/
  const sortedData = await helperPost.sortData(directionParam, sortByParam, combineData);
  /** Create a JSON return objected with the fetchd data */
  const returnObj = { posts: sortedData };

  return res.send(returnObj);
})

module.exports = router;
