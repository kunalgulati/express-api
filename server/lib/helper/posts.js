const fetch = require('node-fetch');
const async = require('async');
const redisCacheHelper = require('../cache/redis');

require('dotenv').config();

/** ********************** Validation Function ********************** */
const validateTags = (tagsArg) => { if (tagsArg === undefined || tagsArg === null || tagsArg === '') { return false; } else { return true; } };

const validateSortBy = (sortByArg) => {
  if (sortByArg === "id" || sortByArg === "reads" || sortByArg === "likes" || sortByArg === "popularity") { return true; } else { return false; }
};
const validateDirection = (directionArg) => { if (directionArg === "asc" || directionArg === "desc") { return true; } else { return false; } };

const tagsArgSplit = (tagsArg) => { return tagsArg.split(',') }

/** Check if the returned request had any error */
const checkStatus = (res) => {
  if (res.ok) { // res.status >= 200 && res.status < 300 
    return res;
  } else {
    return false
  }
}

/** Get all the desired tags from either the Cache or HTTP server (datasource) */
const getAllTagsDataConcurrently = async (tagsArg) => {
  const urlParam = `${process.env.DATA_URL}/db?tag=`;
  let result = [];
  let error = false;
  const urlLink = [];

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
      const response = await fetch(urlParam + eachTag);
      /** Check status of the fetch data */
      if (!checkStatus(response)) { error = true; return null; }

      const data = await response.json();
      result = result.concat(data.posts);

      /** Add the data to cache for future use with */
      const redisData = JSON.stringify(data.posts)
      redisCacheHelper.setValue(eachTag, redisData, expireTimer)

      return data.posts;
    }
  });

  /* Create a list of All url which need to be fetched */
  for (const eachTag of tagsArg) {
    urlLink.push(urlParam + eachTag);
  }
  await getData(urlLink);

  if (!error) { return result } else { return null }
};

/** Get all the desired tags from either the Cache or HTTP server (datasource) */
const getAllTagsDataNotConcurrently = async (tagsArg) => {
  const urlParam = `${process.env.DATA_URL}/db?tag=`;
  let result = [];

  /** Using Async library Es7 mapLimit function to make parallel data fetching requests to hatchways api */
  const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data;
  };
  /* Get Data for all listed the tags */
  for (const eachTag of tagsArg) {
    const data = await getData(urlParam + eachTag);
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