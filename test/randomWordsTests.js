var	cfgTest     = require('./configTest');
var RandomWord  = require('./../server/assets/randomWords.js');


describe('Random Word', function() {
    describe('should load file for random words', function() {

        var sut = new RandomWord();

        it('should load file without errors', function(done) {
            sut.Load(cfgTest.wordsFile, done);
        });

        it('should return one word', function() {
        	var word = sut.GetNext();
            sut.GetNext().should.eql(word);
        });

    });
});
