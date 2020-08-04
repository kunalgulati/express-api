const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const ApiPosts = require('../../../../lib/helper/posts');

/** Group Individual Tests using Describe block */

describe('Post API Helper Function', function () {
  context('Validator for  Tags', function () {
    /** Test Objects for Tags */
    const correctValue = "history,tech,design";
    const undefinedValue = undefined;
    const emptyString = '';

    it('Validate Correct tags', function () {
      expect(correctValue).is.a('string');
      expect(undefinedValue).is.not.a('string');
      expect(emptyString).is.a('string');
    });

    it('Should return true for correct Tag value', function () {
      ApiPosts.validateTags(correctValue)
        .should.equal(true);
    });

    it('Should return false for passing undefine as Tag value', function () {
      ApiPosts.validateTags(undefinedValue)
        .should.equal(false);
    });

    it('Should return false for passing empty string as Tag value', function () {
      ApiPosts.validateTags(emptyString)
        .should.equal(false);
    });

    it('Should return false for passing null string as Tag value', function () {
      ApiPosts.validateTags(null)
        .should.equal(false);
    });
  });

  /**
   * Do not need to test for Null or undefined because the before the function call, the code 
   * always ensures if nothing is passed in queryString then passed argument is equal to default (i.e id) */
  context('Validator for SortBy', function () {
    it('Should return true for Valid sortBy Parameter', function () {
      const valid = "id";

      ApiPosts.validateSortBy(valid)
        .should.equal(true);
    });

    it('Should return false on invalid SortBy Parameter', function () {
      const invalidValue = "id,posts,likes";

      ApiPosts.validateSortBy(invalidValue)
        .should.equal(false);
    });
  });

  /**
   * Do not need to test for Null or undefined because the before the function call, the code 
   * always ensures if nothing is passed in queryString then passed argument is equal to default (i.e asc) */
  context('Validator for Directions', function () {
    it('Should return true for Valid direction Parameter', function () {
      const valid = "desc";

      ApiPosts.validateDirection(valid)
        .should.equal(true);
    });

    it('Should return false on invalid direction Parameter', function () {
      const invalidValue = "up and down";

      ApiPosts.validateDirection(invalidValue)
        .should.equal(false);
    });
  });

  context("Validator for Tag Split", function () {
    it("Should return an array of splitted element for Valid input string", function () {
      const validInput = 'one,two,three';
      const expectedValue = ['one', 'two', 'three']

      expect(validInput).is.a('string');
      expect(ApiPosts.tagsArgSplit(validInput))
        .to.be.an('array')
        .to.have.members(expectedValue)
    });
  });

  context("Test Merge Sort", function () {
    const directionAscInput = 'asc';
    const directionDescInput = 'desc';
    const sortByIdInput = 'id';

    /** Passing an unsorted array */
    it("Should return a sorted array by Ascending order", async function () {
      const validInput = [
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      const expectedValue = [
        {
          author: 'Trevon Rodriguez',
          authorId: 5,
          id: 8,
          likes: 735,
          popularity: 0.76,
          reads: 8504,
          tags: [ 'culture', 'history' ]
        },
        {
          author: 'Trevon Rodriguez',
          authorId: 5,
          id: 8,
          likes: 735,
          popularity: 0.76,
          reads: 8504,
          tags: [ 'culture', 'history' ]
        },
        {
          author: 'Trevon Rodriguez',
          authorId: 5,
          id: 8,
          likes: 735,
          popularity: 0.76,
          reads: 8504,
          tags: [ 'culture', 'history' ]
        },
        {
          author: 'Elisha Friedman',
          authorId: 8,
          id: 4,
          likes: 728,
          popularity: 0.88,
          reads: 19645,
          tags: [ 'science', 'design', 'tech' ]
        },
        {
          author: 'Zackery Turner',
          authorId: 12,
          id: 2,
          likes: 469,
          popularity: 0.68,
          reads: 90406,
          tags: [ 'startups', 'tech', 'history' ]
        },
        {
          author: 'Zackery Turner',
          authorId: 12,
          id: 2,
          likes: 469,
          popularity: 0.68,
          reads: 90406,
          tags: [ 'startups', 'tech', 'history' ]
        },
        {
          author: 'Rylee Paul',
          authorId: 9,
          id: 1,
          likes: 960,
          popularity: 0.13,
          reads: 50361,
          tags: [ 'tech', 'health' ]
        }
      ]

      const actual = await ApiPosts.sortData(directionDescInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(expectedValue)
        .to.deep.equal(expectedValue)
    });

    
    /** Empty array */
    it("Should return empty array when input is empty", async function () {
      const validInput = [];
      const actual = await ApiPosts.sortData(directionDescInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.be.empty;
      expect(actual)
        .to.be.an('array')
        .to.be.empty;
    });

    /** Passing already sorted Array and Expecting same Array as return value */
    it("Should return sorted/same array when input is sorted array (by id & asc)", async function () {
      const validInput = [
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      const expectedValue = [
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      const actual = await ApiPosts.sortData(directionAscInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(expectedValue)
        .to.deep.equal(expectedValue)
    });

    it("Should return sorted/same array when input is sorted array (by Id & Desc)", async function () {
      const validInput = [
        {
          "author": "Ahmad Dunn",
          "authorId": 7,
          "id": 100,
          "likes": 573,
          "popularity": 0.43,
          "reads": 89894,
          "tags": [
            "science",
            "design",
            "history"
          ]
        },
        {
          "author": "Tia Roberson",
          "authorId": 2,
          "id": 99,
          "likes": 473,
          "popularity": 0.34,
          "reads": 97868,
          "tags": [
            "culture",
            "startups",
            "tech"
          ]
        },
        {
          "author": "Tia Roberson",
          "authorId": 2,
          "id": 98,
          "likes": 934,
          "popularity": 0.5,
          "reads": 17307,
          "tags": [
            "design"
          ]
        },
        {
          "author": "Lainey Ritter",
          "authorId": 1,
          "id": 97,
          "likes": 382,
          "popularity": 0.83,
          "reads": 47484,
          "tags": [
            "politics",
            "science",
            "design",
            "culture"
          ]
        }
      ]
      const expectedValue = [
        {
          "author": "Ahmad Dunn",
          "authorId": 7,
          "id": 100,
          "likes": 573,
          "popularity": 0.43,
          "reads": 89894,
          "tags": [
            "science",
            "design",
            "history"
          ]
        },
        {
          "author": "Tia Roberson",
          "authorId": 2,
          "id": 99,
          "likes": 473,
          "popularity": 0.34,
          "reads": 97868,
          "tags": [
            "culture",
            "startups",
            "tech"
          ]
        },
        {
          "author": "Tia Roberson",
          "authorId": 2,
          "id": 98,
          "likes": 934,
          "popularity": 0.5,
          "reads": 17307,
          "tags": [
            "design"
          ]
        },
        {
          "author": "Lainey Ritter",
          "authorId": 1,
          "id": 97,
          "likes": 382,
          "popularity": 0.83,
          "reads": 47484,
          "tags": [
            "politics",
            "science",
            "design",
            "culture"
          ]
        }
      ]
      const actual = await ApiPosts.sortData(directionDescInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(expectedValue)
        .to.deep.equal(expectedValue)

    });

    /** 
     * Reverse Sorting
     * eg: Passing a Sorted Array (by ascending order) and expecting a Sorted Array by Descending order as return value */
    it("Should return sorted array when supplied with Sorted Array (by asc order) and expecting to sory it by descending order", async function () {
      const validInput = [
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      const expectedValue = [        
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
      ]
      const actual = await ApiPosts.sortData(directionDescInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(expectedValue)
        .to.deep.equal(expectedValue)
    });

    it("Should return sorted array when supplied with Sorted Array (by desc order) and expecting to sory it by ascending order", async function () {
      const validInput = [        
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
      ]
      const expectedValue = [
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      
      const actual = await ApiPosts.sortData(directionAscInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(expectedValue)
        .to.deep.equal(expectedValue)

    });

    it("Should return sorted array when supplied with an Array with same input throughout", async function () {
      /** No expected value because, even after sorting the array should remain the same */
      const validInput = [        
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      
      const actual = await ApiPosts.sortData(directionAscInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(validInput)
        .to.deep.equal(validInput)

    });

    it("Should return sorted array when supplied with an array containing duplicates", async function () {
      const validInput = [
        {
          "author": "Rylee Paul",
          "authorId": 9,
          "id": 1,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [
            "tech",
            "health"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
        {
          "author": "Elisha Friedman",
          "authorId": 8,
          "id": 4,
          "likes": 728,
          "popularity": 0.88,
          "reads": 19645,
          "tags": [
            "science",
            "design",
            "tech"
          ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
        {
          "author": "Trevon Rodriguez",
          "authorId": 5,
          "id": 8,
          "likes": 735,
          "popularity": 0.76,
          "reads": 8504,
          "tags": [
            "culture",
            "history"
          ]
        },
      ]
      const expectedValue = [
        {
          author: 'Trevon Rodriguez',
          authorId: 5,
          id: 8,
          likes: 735,
          popularity: 0.76,
          reads: 8504,
          tags: [ 'culture', 'history' ]
        },
        {
          author: 'Trevon Rodriguez',
          authorId: 5,
          id: 8,
          likes: 735,
          popularity: 0.76,
          reads: 8504,
          tags: [ 'culture', 'history' ]
        },
        {
          author: 'Trevon Rodriguez',
          authorId: 5,
          id: 8,
          likes: 735,
          popularity: 0.76,
          reads: 8504,
          tags: [ 'culture', 'history' ]
        },
        {
          author: 'Elisha Friedman',
          authorId: 8,
          id: 4,
          likes: 728,
          popularity: 0.88,
          reads: 19645,
          tags: [ 'science', 'design', 'tech' ]
        },
        {
          author: 'Zackery Turner',
          authorId: 12,
          id: 2,
          likes: 469,
          popularity: 0.68,
          reads: 90406,
          tags: [ 'startups', 'tech', 'history' ]
        },
        {
          author: 'Zackery Turner',
          authorId: 12,
          id: 2,
          likes: 469,
          popularity: 0.68,
          reads: 90406,
          tags: [ 'startups', 'tech', 'history' ]
        },
        {
          author: 'Rylee Paul',
          authorId: 9,
          id: 1,
          likes: 960,
          popularity: 0.13,
          reads: 50361,
          tags: [ 'tech', 'health' ]
        }
      ]
      const actual = await ApiPosts.sortData(directionDescInput, sortByIdInput, validInput);

      expect(validInput)
        .to.be.an('array')
        .to.not.empty;
      /** 
       * Deep check if all members exists in sorted array 
       * Deep compare the value of all members */
      expect(actual)
        .to.be.an('array')
        .to.have.deep.members(expectedValue)
        .to.deep.equal(expectedValue)
    });

  });
});


/**
 * Notes:
 * 1. Need to implement test for both "fail" and "pass" condition
 * 2.
*/