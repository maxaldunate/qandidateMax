var fs = require('fs');

var RandomWord = function(){

    var fullList = [];

    this.Load = function(fileToLoad, callback_) {
        var callback = callback_;
        fs.readFile(fileToLoad, "utf8", function (err, data) {
            if (err) return callback(err);
            fullList = data.toString().split("\n");
            return callback(err);
        });
    };

    this.GetNext = function() {
        var pos = Math.floor(Math.random() * fullList.length);
        return fullList[pos];
    };

};

module.exports = RandomWord;