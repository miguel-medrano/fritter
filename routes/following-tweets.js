var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Tweet = require('../models/Tweet');
var User = require('../models/User');

router.get('/', function(req, res){
    User.findOne({username: req.currentUser.username}, function(err, user){
        if(err){
            utils.sendErrResponse(res, 500, 'An unkown error occurred.');
        } else {
            Tweet.find({username: {$in: user.following}}, function(err, tweets){
                if(err){
                    utils.sendErrResponse(res, 500, 'An unknown error occured');
                } else {
                    utils.sendSuccessResponse(res, {tweets: tweets});
                }
            });
        }
    });
});


module.exports = router;