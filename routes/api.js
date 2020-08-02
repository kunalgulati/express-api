var express = require('express');
const fetch = require('node-fetch');
const request = require('request');

var router = express.Router();

/** 
 * Router-1 
 * api/ping
*/
router.get('/ping', (req, res) => {
  let returnObj = { "success": true }
  return res.send(returnObj);
})

/** 
 * Router-2 
 * api/posts
*/

var checkStatus = (res) => {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  } else {
    throw MyCustomError(res.statusText);
  }
}

/** ********************** Validation Function ********************** */

var validateTags = (tagsArg) => { if (tagsArg === undefined || tagsArg === '') { return false; } else { return true; } };

const validateSortBy = (sortByArg) => {
  if (sortByArg === "id" || sortByArg === "reads" || sortByArg === "likes" || sortByArg === "popularity") { return true; } else { return false; };
};
const validateDirection = (directionArg) => { if (directionArg === "asc" || directionArg === "desc") { return true; } else { return false; } };

/** 
 * Seprate by commas
 * Return an Array
 * */
const tagsArgSplit = (tagsArg) => { return tagsArg.split(',') }

const getHatwaysDataFromAPI = async (url) => {
  let response = await fetch(url)
  let data = await response.json()
  return data;
}

const getAllTagsData = async (tagsArg) => {
  let urlParam = `https://hatchways.io/api/assessment/blog/posts?tag=`;
  let result = [];

  /* Get Data for all listed the tags */
  for (var eachTag of tagsArg) {
    let data = await getHatwaysDataFromAPI(urlParam + eachTag);
    result = result.concat(data.posts)
  }
  return result;
};

const sortData = async (directionArg, sortByArg, apiData) => {
  /** source: https://www.digitalocean.com/community/tutorials/js-understanding-merge-sort */
  const merge = (arr1, arr2) => {
    let sorted = [];
    while (arr1.length && arr2.length) {

      if ((arr1[0][sortByArg] < arr2[0][sortByArg]) && directionArg == "asc") {
        sorted.push(arr1.shift());
      }
      else if ((arr1[0][sortByArg] > arr2[0][sortByArg]) && directionArg == "desc") {
        sorted.push(arr1.shift());
      }
      else {
        sorted.push(arr2.shift());
      }
    };
    return sorted.concat(arr1.slice().concat(arr2.slice()));
  };

  const mergeSort = arr => {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);

    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
  };

  return mergeSort(apiData);
}

const removeDuplicates = async (apiData) => {
  let checkSet = new Set();
  let result = [];
  /** 
   *  Using a map Datastructure's has property, remove duplicates 
   *  Space Complexity: O(n)
   * */
  for (var each of apiData) {
    if (!checkSet.has(each.id)) {
      checkSet.add(each.id);
      result.push(each);
    }
  }
  return result;
};

router.get('/posts', async (req, res) => {

  /** Check and return if some value for specified paramter was paased, Otherwise, return default */
  let sortByParam = (req.query.sortBy || 'id').toLowerCase();
  let directionParam = (req.query.direction || 'asc').toLowerCase();
  let tagsParam = req.query.tags;

  /** Validate user-passed Parameters */
  if (!validateTags(tagsParam)) { return res.send({ "error": "Tags parameter is required" }) };
  if (!validateSortBy(sortByParam)) { return res.send({ "error": "sortBy parameter is invalid" }) };
  if (!validateDirection(directionParam)) { return res.send({ "direction": "direction parameter is invalid" }) };

  /** Convert to lower case to ensure no client-side error && Split the tags into array */
  tagsParam = tagsParam.toLowerCase();
  tagsParam = tagsArgSplit(tagsParam);

  /* Fetch all data */
  let result = await getAllTagsData(tagsParam);
  /** Remove duplicates / Combine Fetched Data */
  let combineData = await removeDuplicates(result);
  /** Sort the combined data using "SortedBy" and "Direction" argument passed in the Query String*/
  let sortedData = await sortData(directionParam, sortByParam, combineData);
  /** Create a JSON return objected with the fetchd data */
  let returnObj = { posts: sortedData };

  return res.send(returnObj);
})

module.exports = router;
