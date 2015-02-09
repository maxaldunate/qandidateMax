var express     = require('express');
var	expressApp  = express();
var	mongoose    = require('mongoose');
var	bodyParser	= require('body-parser');
var	morgan      = require('morgan');
var	config      = require('./config');
var multer 		= require('multer');

var RandomWord  = require('./server/assets/randomWords');
var randomWord = new RandomWord();
randomWord.Load(config.wordsFile, function(err){
    if(err)
        console.log('There was an error loading the file with random words!');
    else
        console.log('File with random words was loaded successfully!');
});

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended: true}));
expressApp.use(multer());

expressApp.use(morgan('dev'));

mongoose.connect(config.db.connectionString);

expressApp.get('/', function (req, res) {
    res.send('Welcome to hangman QandidateMax Restfull API!');
});

expressApp.use('/', require('./server/games/gameRoute')(express, randomWord));
expressApp.listen(config.portToListen);

console.log('Server Listening on port '+ config.portToListen);
