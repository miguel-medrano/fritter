var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Tweet = require('../models/Tweet');
var User = require('../models/User');

/*
 GET /tweets
 No request parameters
 Response:
 - success: true if the server succeeded in getting the user's tweets
 - content: on success, an object with a single field 'tweets', which contains a list of the
 user's tweets
 - err: on failure, an error message
 */

router.get('/', function(req, res){
    Tweet.find({}, function(err, tweets){
        if (err){
            utils.sendErrResponse(res, 500, 'An unknown error occurred.');
        } else {
            User.findOne({username: req.currentUser.username}, function(err, user){
                utils.sendSuccessResponse(res, {tweets: tweets, following: user.following});
            });
        }
    });
});

module.exports = router;