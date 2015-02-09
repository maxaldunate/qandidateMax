var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  wordToGuess: String,
  word: String,
  triesLeft: { 
  	type: Number,
  	 min: 0,
  	 max : 11,
  	 default : 11 },
  status: String,
  letters: [String]
});

module.exports = GameSchema;