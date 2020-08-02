const chai = require('chai');
const should = chai.should();
const Api = require('../../../routes/api');

describe('Api Schema', function(){
  context('Date and Time Combinatio', function(){
    it('Shoild return hello', function(){

      Api.test()
        .should.equal("hello")
    });

    // Describt eh behavior of the System
    // it("should return Hwllo string", function(){
    //   const returnString = "shsh" ;

    //   should.not.exists();
    // });
  });
});