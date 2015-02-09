var bodyParser = require('body-parser');
var Game  = require('./gameModel');

module.exports = function(express, randomWord) {

	var apiRouter = express.Router();

	apiRouter.route('/games')

		.post(function(req, res) {
			var game = new Game();
			game.setDefault(randomWord);
			game.save(function(err) {
				if (err) return res.send(err);
				res.json({ message: 'Game created!', newId : game._id });
			});
		})

		.get(function(req, res) {
            Game.find({},{
				"_id": 1,
				"status": 1,
				"word": 1,
				"triesLeft": 1
			},function(err, games) {
				if (err) res.send(err);
				res.json(games);
			});
		});

	apiRouter.route('/games/:game_id')

		.get(function(req, res) {
			Game.findById(req.params.game_id, function(err, game) {
				if (err) res.send(err);
				if(!game) return res.json({});
				res.json(game.getSingleProjection());
			});
		})

		.post(function(req, res) {
			Game.findById(req.params.game_id, function(err, game) {

				if (err) res.send(err);
				if (req.body.char) {
					game.guessingALetter(req.body.char)
				};

				game.save(function(err) {
					if (err) res.send(err);
				});

				var result = {_id: game._id, triesLeft : game.triesLeft, word : game.word};
				if(game.status==="busy")
					result.message = 'Go on!';
				if(game.status==="fail")
					result.message = 'Sorry, you loose the game!';
				if(game.status==="success")
					result.message = 'You guessed the word!';

				res.json(result);

			});
		})

	return apiRouter;
};