const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const ApiPosts = require('../../../../lib/helper/posts');

/** Group Individual Tests using Describe block */

describe('Post API Helper Function', function(){
  context('Test ValidateTags Function', function(){
    /** Test Objects for Tags */
    const correctValue= "history,tech,design";
    const undefinedValue = undefined;
    const emptyString = '';
    
    it('Validate Correct tags', function(){
      expect(correctValue).is.a('string');
      expect(undefinedValue).is.not.a('string');
      expect(emptyString).is.a('string');
    });

    it('Should return true for correct Tag value', function() {
      ApiPosts.validateTags(correctValue)
        .should.equal(true);
    });

    it('Should return false for passing undefine as Tag value', function() {
      ApiPosts.validateTags(undefinedValue)
        .should.equal(false);
    });

    it('Should return false for passing empty string as Tag value', function() {
      ApiPosts.validateTags(emptyString)
        .should.equal(false);
    });

    it('Should return false for passing null string as Tag value', function() {
      ApiPosts.validateTags(null)
        .should.equal(false);
    });
  });

  /**
   * Do not need to test for Null or undefined because the before the function call, the code 
   * always ensures if nothing is passed in queryString then passed argument is equal to default (i.e id) */
  context('Test ValidateSortBy Function', function(){
    it('Should return true for Valid sortBy Parameter', function() {
      const valid = "id";

      ApiPosts.validateSortBy(valid)
        .should.equal(true);
    });

    it('Should return false on invalid SortBy Parameter', function() {
      const invalidValue = "id,posts,likes";

      ApiPosts.validateSortBy(invalidValue)
        .should.equal(false);
    });
  });

  /**
   * Do not need to test for Null or undefined because the before the function call, the code 
   * always ensures if nothing is passed in queryString then passed argument is equal to default (i.e asc) */
  context('Test ValidateDirection Function', function(){
    it('Should return true for Valid direction Parameter', function() {
      const valid = "desc";

      ApiPosts.validateDirection(valid)
        .should.equal(true);
    });

    it('Should return false on invalid direction Parameter', function() {
      const invalidValue = "up and down";

      ApiPosts.validateDirection(invalidValue)
        .should.equal(false);
    });
  });
});


/** 
 * Notes:
 * 1. Need to implement test for both "fail" and "pass" condition
 * 2. 
*/