var	should    = require('should');
var request = require('supertest');

describe('Integration Tests. Server running is needed!', function() {
  var url = 'http://localhost:3001';
  var gameId = {};

  describe('Games Routes', function() {

    it('POST /games. Should return the new game id', function(done) {
      request(url)
        .post('/games')
        .send({})
        .end(function(err, res) {
          if (err) throw err;
          gameId = res.body.newId;
          res.statusCode.should.eql(200);
          done();
        });
    });

    it('GET /games/:id. Should return the game status at busy and tries left at 11', function(done) {
      request(url)
        .get('/games/' + gameId)
        .send({})
        .end(function(err, res) {
          if (err) throw err;
          res.body.status.should.eql('busy');
          res.body.triesLeft.should.eql(11);
          done();
        });
    });

    it('GET /games. Should return all the games', function(done) {
      request(url)
          .get('/games')
          .send({})
          .end(function(err, res) {
            if (err) throw err;
            res.body.length.should.not.eql(0);
            done();
          });
    });

    it('POST /games/:id. Should return leftTries = 10 ', function(done) {
      var postData = { char : "8" };
      request(url)
          .post('/games/' + gameId)
          .send(postData)
          .end(function(err, res) {
            if (err) throw err;
            res.body.triesLeft.should.eql(10);
            done();
          });
    });
  });
});