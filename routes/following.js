var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var Tweet = require('../models/Tweet');
var User = require('../models/User');

router.post('/', function(req, res){
    User.findOneAndUpdate({username: req.currentUser.username},
        {$push : {following: req.body.followUsername}},
        {safe: true, upsert: true},
        function(err) {
            if(err){
                utils.sendErrResponse(res, 500, 'An unkown error occurred');
            } else {
                utils.sendSuccessResponse(res);
            }
        }
    );
});


module.exports = router;