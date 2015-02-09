# Qandidate Developer assessment v0.1
# Max Aldunate (maxaldunate@gmail.com)

Developer assessment v0.1
https://docs.google.com/document/d/1NVPb3tOwOsMm1OhzyFqzN3HXPVTaRku-LPFzfLGPWgw/edit


## The Hangman API
***

## Quick setup environment

Install Node.js and then:

```sh
$ git clone git@bitbucket.org:maldunate/uibaas.git
$ cd qandidateMax
$ npm install
```

Run unit tests:

```sh
$ mocha
```

Run integration tests:
A running server in other shell is needed!!!

```sh
$ mocha .\testIntegration
```

## Links
[Bitbucket Repo](https://bitbucket.org/maldunate/uibaas)


# API Description
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
					- A list of words can be found here. At the start of the game a random word should be picked from this list.

    All chars are accepted, but just the valids are taking into account. (a-z)