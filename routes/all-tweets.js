var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Tweet = require('../models/Tweet');

/*
 Grab a note from the store whenever one is referenced with an ID in the
 request path (any routes defined with :note as a paramter).
 */
//router.param('tweet', function(req, res, next, tweetId) {
//    User.getTweet(req.currentUser.username, tweetId, function(err, tweet) {
//        if (tweet) {
//            req.tweet = tweet;
//            next();
//        } else {
//            utils.sendErrResponse(res, 404, 'Resource not found.');
//        }
//    });
//});



/*
 At this point, all requests are authenticated and checked:
 1. Clients must be logged into some account
 2. If accessing or modifying a specific resource, the client must own that note
 3. Requests are well-formed
 */

/*
 GET /tweets
 No request parameters
 Response:
 - success: true if the server succeeded in getting the user's tweets
 - content: on success, an object with a single field 'tweets', which contains a list of the
 user's tweets
 - err: on failure, an error message
 */
//router.get('/', function(req, res) {
//    User.getAllTweets( function(err, tweets) {
//        if (err) {
//            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
//        } else {
//            utils.sendSuccessResponse(res, {tweets: tweets });
//        }
//    });
//});

router.get('/', function(req, res){
    Tweet.find({}, function(err, tweets){
        if (err){
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            utils.sendSuccessResponse(res, {tweets: tweets});
        }
    });
});




/*
 GET /tweets/:tweet
 Request parameters:
 - tweet: the unique ID of the tweet within the logged in user's tweet collection
 Response:
 - success: true if the server succeeded in getting the user's tweets
 - content: on success, the tweet object with ID equal to the tweet referenced in the URL
 - err: on failure, an error message
// */
//router.get('/:tweet', function(req, res) {
//    utils.sendSuccessResponse(res, req.tweet);
//});

module.exports = router;