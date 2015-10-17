var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {type: String,unique: true},
    password: String,
    following: Array
});

module.exports = mongoose.model("User", userSchema);

// Data for each User is stored in memory instead of in
// a database. This store (and internal code within the User model)
// could in principle be replaced by a database without needing to
//// modify any code in the controller.
//var _store = { };
//
//// Model code for a User object in the twitter app.
//// Each User object stores a username, password, and collection
//// of tweets. Each tweet has some textual content and is specified
//// by the owner's username as well as an ID. Each ID is unique
//// only within the space of each User, so a (username, tweetID)
//// uniquely specifies any tweet.
//var User = (function User(_store) {
//
//    var that = Object.create(User.prototype);
//
//    var userExists = function(username) {
//        return _store[username] !== undefined;
//    };
//
//    var getUser = function(username) {
//        if (userExists(username)) {
//            return _store[username];
//        }
//    };
//
//    that.findByUsername = function (username, callback) {
//        if (userExists(username)) {
//            callback(null, getUser(username));
//        } else {
//            callback({ msg : 'No such user!' });
//        }
//    };
//
//    that.verifyPassword = function(username, candidatepw, callback) {
//        if (userExists(username)) {
//            var user = getUser(username);
//            if (candidatepw === user.password) {
//                callback(null, true);
//            } else {
//                callback(null, false);
//            }
//        } else {
//            callback(null, false);
//        }
//    };
//
//    that.createNewUser = function (username, password, callback) {
//        if (userExists(username)) {
//            callback({ taken: true });
//        } else {
//            _store[username] = { 'username' : username,
//                'password': password,
//                'tweets' : [] };
//            callback(null);
//        }
//    };
//
//    that.getAllTweets = function (callback) {
//        var users = Object.keys(_store);
//        var allTweets = [];
//        users.forEach(function(username){
//            allTweets = allTweets.concat(_store[username].tweets);
//        });
//        callback(null, allTweets);
//    };
//
//    that.getTweet = function(username, tweetId, callback) {
//        if (userExists(username)) {
//            var user = getUser(username);
//            if (user.tweets[tweetId]) {
//                var tweet = user.tweets[tweetId];
//                callback(null, tweet);
//            } else {
//                callback({ msg : 'Invalid tweet. '});
//            }
//        } else {
//            callback({ msg : 'Invalid user. '});
//        }
//    };
//
//    that.getTweets = function(username, callback) {
//        if (userExists(username)) {
//            var user = getUser(username);
//            callback(null, user.tweets);
//        } else {
//            callback({ msg : 'Invalid user.' });
//        }
//    };
//
//    that.addTweet = function(username, tweet, callback) {
//        if (userExists(username)) {
//            var user = getUser(username);
//            tweet._id = user.tweets.length;
//            tweet.username = username;
//            user.tweets.push(tweet);
//            callback(null);
//        } else {
//            callback({ msg : 'Invalid user.' });
//        }
//    };
//
//    that.updateTweet = function(username, tweetId, newContent, callback) {
//        if (userExists(username)) {
//            var tweets = getUser(username).tweets;
//            if (tweets[tweetId]) {
//                tweets[tweetId].content = newContent;
//                tweets[tweetId].username = username;
//                callback(null);
//            } else {
//                callback({ msg : 'Invalid tweet.' });
//            }
//        } else {
//            callback({ msg : ' Invalid user.' });
//        }
//    };
//
//    that.removeTweet = function(username, tweetId, callback) {
//        if (userExists(username)) {
//            var tweet = getUser(username).tweets;
//            if (tweet[tweetId]) {
//                delete tweet[tweetId];
//                callback(null);
//            } else {
//                callback({ msg : 'Invalid tweet.' });
//            }
//        } else {
//            callback({ msg : 'Invalid user.' });
//        }
//    };
//
//    Object.freeze(that);
//    return that;
//
//})(_store);

//module.exports = User;