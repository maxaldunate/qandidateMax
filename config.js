module.exports = {
	'portToListen': process.env.PORT || 3001,
	'db' : {
		'connectionString': 'mongodb://localhost:27017/maxdata'
		//'connectionString': 'mongodb://maxdata:maxdata@ds039251.mongolab.com:39251/maxdata'
	},
    'wordsFile' : './server/assets/words.english.txt'
};