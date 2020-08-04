const fetch = require('node-fetch');
const async = require('async');
// const redisCacheHelper = require('../cache/redis');

/** ********************** Validation Function ********************** */
const validateTags = (tagsArg) => { if (tagsArg === undefined || tagsArg === null || tagsArg === '') { return false; } else { return true; } };

const validateSortBy = (sortByArg) => {
  if (sortByArg === "id" || sortByArg === "reads" || sortByArg === "likes" || sortByArg === "popularity") { return true; } else { return false; }
};
const validateDirection = (directionArg) => { if (directionArg === "asc" || directionArg === "desc") { return true; } else { return false; } };

const tagsArgSplit = (tagsArg) => { return tagsArg.split(',') }

const checkStatus = (res) => {
  if (res.ok) { // res.status >= 200 && res.status < 300 
    return res;
  } else {
      return false
  }
}

/** @TODO Write Unit test for this function */
const getAllTagsData = async (tagsArg) => {
  const urlParam = `https://hatchways.io/api/assessment/blog/posts?tag=`;
  let result = [];
  let error = false;
  const urlLink = [];

  /** Using Async library Es7 mapLimit function to make parallel data fetching requests to hatchways api */
  // const getData = (urlLink) => async.mapLimit(urlLink, 100, async function (url) {
  const getData = () => async.mapLimit(tagsArg, 100, async function (eachTag) {
    /** Check if the data for desired tag already exists in the Cache */
    // const cacheData = redisCacheHelper.get(eachTag);
    // const expireTimer = 60; // 10 mins = 600 secs
    // if (cacheData){
    //   result = result.concat(cacheData); return cacheData;
    // }
    // else {
      const response = await fetch(urlParam+eachTag);
      console.log(urlParam+eachTag);
      /** Check status of the fetch data */
      if(!checkStatus(response)) { error=true; return null; }
      const data = await response.json();
      result = result.concat(data.posts);
      /** Add the data to cache for future use with */
      // redisCacheHelper.set(eachTag, data.posts, expireTimer)
      // return data.posts;
    // }
    return null;
  });

  /* Create a list of All url which need to be fetched */
  for (const eachTag of tagsArg) {
    urlLink.push(urlParam + eachTag);
  }

  await getData(urlLink);

  if(!error) {return result} else {return null}
};

/**  
 * Using Modified version of MergeSort to sort the fetched data
 * 
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
  getAllTagsData,
  sortData,
  removeDuplicates,
}