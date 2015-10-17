var mongoose = require("mongoose");

var tweetSchema =  mongoose.Schema({
    username: String,
    creator: String,
    content: String
});

module.exports = mongoose.model("Tweet", tweetSchema);