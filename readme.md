# Qandidate Developer assessment v0.1
## Max Aldunate (maxaldunate@gmail.com)

[Developer assessment v0.1](https://docs.google.com/document/d/1NVPb3tOwOsMm1OhzyFqzN3HXPVTaRku-LPFzfLGPWgw/edit)

## The Hangman API
***

## Quick setup environment

Install Node.js and then:
```sh
$ git clone https://github.com/maxaldunate/qandidateMax.git
$ cd qandidateMax
$ npm install
```

Install mocha globally:
```sh
$ npm install -g mocha
```

Run unit tests:
```sh
$ mocha
```

Run a Node Server:
```sh
$ node server
```

Run integration tests:
A server running in another console is needed!!! (previous step)
```sh
$ mocha testIntegration
```

Note: All this was tested just in a windows machine! :(

## Links
[GitHub Repo](https://github.com/maxaldunate/qandidateMax.git)

***
## API Description
	POST    /games      Start a new game

	GET     /games      Overview of all games

	POST    /games/:id  Guessing a letter, POST body: char=a

	GET     /games/:id  JSON response that should at least include:
                    - word: representation of the word that is being guessed. 
                    - Should contain dots for letters that have not been guessed yet (e.g. aw.so..)
                    - tries_left: the number of tries left to guess the word (starts at 11)
                    - status: current status of the game (busy|fail|success)

					- Guessing a correct letter doesn’t decrement the amount of tries left
					- Only valid characters are a-z
					- A list of words can be found [here](https://drive.google.com/file/d/0Bz23lIMv61czenRpc3NUV3NlWUU/edit?usp=sharing)
					. At the start of the game a random word will be picked from this list.

    All chars are accepted, but just the valids are taking into account. (a-z)
