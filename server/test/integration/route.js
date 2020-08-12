const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('App Integration Tests', function () {
  context('Validator response and status code for /api/ping', function () {

    /** Route 1: /api/ping */
    it('Should return status = 200 and json object', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/ping')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();                               // <= Call done to signal callback end
        });
    });

    it('Should return status = 200 for queryString with Tags field', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/posts?tags="history')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();                               // <= Call done to signal callback end
        });
    });

    it('Should return status = 200 for queryString with Direction field', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/posts?tags="direction=asc')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();                               // <= Call done to signal callback end
        });
    });

    it('Should return status = 200 for queryString with SortBy field', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/posts?tags="sortBy="likes')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();                               // <= Call done to signal callback end
        });
    });

    it('Should return status = 400 for queryString with No Tags field', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/posts')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json
          expect(res.body).to.deep.equal({ error: "Tags parameter is required" });
          done();                               // <= Call done to signal callback end
        });
    });

    it('Should return status = 400 for queryString with Wrong SortBy parameter', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/posts?tags=history&sortBy=wrong')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json
          expect(res.body).to.deep.equal({ error: "sortBy parameter is invalid" });
          done();                               // <= Call done to signal callback end
        });
    });

    it('Should return status = 400 for queryString with Wrong Direction parameter', function (done) { // <= Pass in done callback
      chai.request('http://localhost:4000')
        .get('/api/posts?tags=history&sortBy=id&direction=down')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json
          expect(res.body).to.deep.equal({ error: "direction parameter is invalid" });
          done();                               // <= Call done to signal callback end
        });
    });


  });
});
