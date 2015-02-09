module.exports = {
	'portToListen': process.env.PORT || 3011,
	'db' : {
		'connectionString': 'mongodb://localhost:27017/maxdatatest'
		//'connectionString': 'mongodb://maxdatatest:maxdatatest@ds041831.mongolab.com:41831/maxdatatest'
	},
    'wordsFile' : './test/randomWordsTests.txt'
};