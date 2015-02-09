var mongoose = require('mongoose');
var GameSchema = require('./gameSchema');

GameSchema.methods.setDefault = function(randomWord) {
    var game = this;
    game.wordToGuess = randomWord.GetNext();
    game.word        = Array(game.wordToGuess.length+1).join(".");
    game.triesLeft   =  11;
    game.status      =  "busy";
};

GameSchema.methods.getSingleProjection = function() {
    var game = this;
    return {
        "_id": game._id,
        "status": game.status,
        "word": game.word,
        "triesLeft": game.triesLeft
    };
};

GameSchema.methods.guessingALetter = function(letter) {
    var game = this;
    if(game.status!="busy") return;

    var startIndex = 0;
    var guessed = false;
    while ((index = game.wordToGuess.indexOf(letter, startIndex)) > -1) {
        guessed = true;
        game.word = setCharAt(game.word,index,letter);
        startIndex = index + 1;
    };

    if(!guessed)
        game.triesLeft = game.triesLeft - 1;

    if(game.word.indexOf('.')>-1){
        if(game.triesLeft===0)
            game.status="fail";
    }else{
        game.status="success";
    }

    game.letters.push(letter);

    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }

};

module.exports = mongoose.model('Game', GameSchema);
