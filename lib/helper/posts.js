const fetch = require('node-fetch');
const async = require('async');

/** ********************** Validation Function ********************** */

const validateTags = (tagsArg) => { if (tagsArg === undefined || tagsArg === null || tagsArg === '') { return false; } else { return true; } };

const validateSortBy = (sortByArg) => {
  if (sortByArg === "id" || sortByArg === "reads" || sortByArg === "likes" || sortByArg === "popularity") { return true; } else { return false; }
};
const validateDirection = (directionArg) => { if (directionArg === "asc" || directionArg === "desc") { return true; } else { return false; } };

/** 
 * Seprate by commas
 * Return an Array
 * */
const tagsArgSplit = (tagsArg) => { return tagsArg.split(',') }

const getAllTagsData = async (tagsArg) => {
  const urlParam = `https://hatchways.io/api/assessment/blog/posts?tag=`;
  let result = [];
  const urlLink = [];

  const getData = (urlLink) => async.mapLimit(urlLink, 100, async function (url) {
    const response = await fetch(url);
    const data = await response.json();
    result = result.concat(data.posts);
    return data.posts;
  });

  /* Create a list of All url which need to be fetched */
  for (const eachTag of tagsArg) {
    urlLink.push(urlParam + eachTag);
  }

  await getData(urlLink);

  return result;
};

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