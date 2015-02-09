var	cfgTest = require('./configTest');
var gameModel = require("../server/games/gameModel");
var gameGuess = require("../server/games/gameModel");
var gameFailed = require("../server/games/gameModel");
var should = require('should');
var mongoose = require("mongoose");
mongoose.connect(cfgTest.db.connectionString);

describe('Game Model', function() {
    describe("setDefault & getSingleProjection", function(){

        before(function(done){
            gameModel = new gameModel();
            done();
        });

        it('setDefault() should change status to busy', function(){
            gameModel.setDefault({ GetNext : function(){return "maximilian";}});
            gameModel.status.should.eql('busy');
        });

        it('getSingleProjection(). Should projection have to hide word to guess', function(){
            gameModel.getSingleProjection().should.have.property('word');
            gameModel.getSingleProjection().should.not.have.property('wordToGuess');
        });

    });

    describe("guessingALetter", function(){

        before(function(done){
            gameGuess = new gameGuess();
            gameGuess.setDefault({ GetNext : function(){return "maximilian";}});
            done();
        });

        it('Success or failed game. Should do nothing for no busy game', function(){
            gameGuess.status      =  'success';
            gameGuess.guessingALetter('m');
            gameGuess.status.should.eql('success');
            gameGuess.triesLeft.should.eql(11);
        });

        it('Not guessed letter. Should decrease in one attempt remaining & remain status busy', function(){
            gameGuess.status      =  'busy';
            gameGuess.guessingALetter('8');
            gameGuess.status.should.eql('busy');
            gameGuess.triesLeft.should.eql(10);
        });

        it('Guessed Letter. Should mantain tries left, remain status busy and fill word with dots', function(){
            gameGuess.status      =  'busy';
            gameGuess.guessingALetter('m');
            gameGuess.word.should.eql('m...m.....');
            gameGuess.status.should.eql('busy');
            gameGuess.triesLeft.should.eql(10);
        });

        it('Guessed Word. Should mantain tries left, chamge status to busy and fill word with word to guess', function(){
            gameGuess.status      =  'busy';
            gameGuess.guessingALetter('a');
            gameGuess.guessingALetter('x');
            gameGuess.guessingALetter('i');
            gameGuess.guessingALetter('l');
            gameGuess.guessingALetter('n');
            gameGuess.word.should.eql('maximilian');
            gameGuess.status.should.eql('success');
            gameGuess.triesLeft.should.eql(10);
        });
    });

    describe("Failed Game", function(){

        before(function(done){
            gameFailed = new gameFailed();
            gameFailed.setDefault({ GetNext : function(){return "max";}});
            done();
        });

        it('Not guessed words. Should change tries left to zero and change status to fail', function(){
            gameFailed.status      =  'busy';
            for (var i = 0; i <= 10; i++) {
                gameFailed.guessingALetter('r');
            };            
            
            gameFailed.word.should.eql('...');
            gameFailed.status.should.eql('fail');
            gameFailed.triesLeft.should.eql(0);
        });
    });

});