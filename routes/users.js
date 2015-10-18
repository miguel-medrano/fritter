var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User');

var isLoggedInOrInvalidBody = function(req, res) {
  if (req.currentUser) {
    utils.sendErrResponse(res, 403, 'There is already a user logged in.');
    return true;
  } else if (!(req.body.username && req.body.password)) {
    utils.sendErrResponse(res, 400, 'Username or password not provided.');
    return true;
  }
  return false;
};


router.post('/login', function(req,res){
    if (isLoggedInOrInvalidBody(req, res)) {
        return;
    }
    User.findOne({username: req.body.username}, function(err, user){
        if (user && user.password === req.body.password) {
            req.session.username = req.body.username;
            utils.sendSuccessResponse(res, {user: req.body.username});
        } else {
            utils.sendErrResponse(res, 403, 'Username or password invalid');
        }
    });
});


/*
 POST /users/logout
 Request body: empty
 Response:
 - success: true if logout succeeded; false otherwise
 - err: on error, an error message
 */
router.post('/logout', function(req, res) {
  if (req.currentUser) {
    req.session.destroy();
    utils.sendSuccessResponse(res);
  } else {
    utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
  }
});

/*
 Create a new user in the system.
 POST /users
 Request body:
 - username
 - password
 Response:
 - success: true if user creation succeeded; false otherwise
 - err: on error, an error message
 */

router.post('/', function(req, res){
    if (isLoggedInOrInvalidBody(req, res)){
        return;
    }
    user = req.body;
    User.create({ username: user.username,
            password: user.password,
            tweets: [],
            following: []},
        function(err){
            if (err) {
                if (err.code === 11000) {
                    utils.sendErrResponse(res, 400, 'That username is already taken!');
                } else {
                    utils.sendErrResponse(res, 500, 'An unknown error has occurred.');
                }
            } else {
                utils.sendSuccessResponse(res, req.body.username);
            }
        }
    );
});




/*
 Determine whether there is a current user logged in

 GET /users/current
 No request parameters
 Response:
 - success.loggedIn: true if there is a user logged in; false otherwise
 - success.user: if success.loggedIn, the currently logged in user
 */
router.get('/current', function(req, res) {
  if (req.currentUser) {
    utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
  } else {
    utils.sendSuccessResponse(res, { loggedIn : false });
  }
});

module.exports = router;