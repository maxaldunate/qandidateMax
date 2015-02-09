var	should    = require('should');
var	mongoose    = require('mongoose');
var	cfgTest = require('./configTest');
var request = require('supertest');
var	bodyParser	= require('body-parser');
var express     = require('express');
var	expressApp  = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use('/', require('../server/games/gameRoute')(express, { GetNext : function(){return "maximilian";}}));

describe('Games Routes', function() {
  var gameId = {};

  describe('Route just /game with POST & GET', function() {

    it('POST /games. Should return the new game id', function(done) {
      request(expressApp)
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
      request(expressApp)
        .get('/games/' + gameId)
        .send({})
        .end(function(err, res) {
          if (err) throw err;
          res.body.status.should.eql('busy');
          res.body.triesLeft.should.eql(11);
          done();
        });
    });
  });

  describe('Route /game/id_game with POST & GET', function() {
    it('GET /games. Should return all the games', function(done) {
      request(expressApp)
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
      request(expressApp)
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