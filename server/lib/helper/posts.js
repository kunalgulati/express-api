const async = require('async');
const redisCacheHelper = require('../cache/redis');
const dbHelper = require('./db');

require('dotenv').config();

/** ********************** Validation Function ********************** */
const validateTags = (tagsArg) => { if (tagsArg === undefined || tagsArg === null || tagsArg === '') { return false; } else { return true; } };

const validateSortBy = (sortByArg) => {
  if (sortByArg === "id" || sortByArg === "reads" || sortByArg === "likes" || sortByArg === "popularity") { return true; } else { return false; }
};
const validateDirection = (directionArg) => { if (directionArg === "asc" || directionArg === "desc") { return true; } else { return false; } };

const tagsArgSplit = (tagsArg) => { return tagsArg.split(',') }

/** Get all the desired tags from either the Cache or HTTP server (datasource) */
const getAllTagsDataConcurrently = async (tagsArg) => {
  let result = [];
  let error = false;

  /** Using Async library Es7 mapLimit function to make parallel data fetching requests to hatchways api */
  const getData = () => async.mapLimit(tagsArg, 100, async function (eachTag) {

    /** Check if the desired Tag data already exists in the Redis Cache DB */
    let cacheData = await redisCacheHelper.getValue(eachTag);
    const expireTimer = 600; // 10 mins = 600 secs

    if (cacheData) {
      cacheData = JSON.parse(cacheData);
      result = result.concat(cacheData);
      return cacheData;
    }
    else {
      const data = await dbHelper.getTag(eachTag);
      /** Check status of the fetch data */
      if (data === null || data === undefined) { error = true; return null }

      result = result.concat(data.posts);
      /** Add the data to cache for future use with */
      const redisData = JSON.stringify(data.posts)
      redisCacheHelper.setValue(eachTag, redisData, expireTimer)

      return data.posts;
    }

  });

  await getData();
  if (!error) { return result } else { return null }
};

/** Get all the desired tags from either the Cache or HTTP server (datasource) */
const getAllTagsDataNotConcurrently = async (tagsArg) => {
  let result = [];

  /* Get Data for all listed the tags */
  for (const eachTag of tagsArg) {
    const data = await dbHelper.getTag(eachTag)
    result = result.concat(data.posts)
  }
  return result;
};

/**  
 * Using Modified version of MergeSort to sort the fetched data
 * For sorting I decided to use Merge sort based on my research, the possible sorting algorithms to use were:
    * Radix Sort
    * QuickSort
  The reason to reject the radix sort was that it fails for floating values. So it wouldn't be able to sort by popularity. 
  Quicksort isn't a stable algorithm and can break for certain input values
*/
const sortData = async (directionArg, sortByArg, apiData) => {
  /** source: https://www.digitalocean.com/community/tutorials/js-understanding-merge-sort */
  const merge = (arr1, arr2) => {
    const sorted = [];
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
    }
    return sorted.concat(arr1.slice().concat(arr2.slice()));
  };

  const mergeSort = arr => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  };

  return mergeSort(apiData);
}

/** 
 * Pure function: Given the same input, will always return the same output; And Produces no side effects
 * This is a Pure function
*/
const removeDuplicates = async (apiData) => {
  const checkSet = new Set();
  const result = [];
  /** 
   *  Using a map Datastructure's has property, remove duplicates 
   *  Space Complexity: O(n)
   * */
  for (const each of apiData) {
    if (!checkSet.has(each.id)) {
      checkSet.add(each.id);
      result.push(each);
    }
  }
  return result;
};


module.exports = {
  validateTags,
  validateSortBy,
  validateDirection,
  tagsArgSplit,
  sortData,
  removeDuplicates,
  getAllTagsDataConcurrently,
  getAllTagsDataNotConcurrently,
}