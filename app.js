var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
var allTweets = require('./routes/all-tweets');
var followingTweets = require('./routes/following-tweets');
require('handlebars/runtime');

var User = require('./models/User');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
    console.log("database connected");
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '6170', resave: true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware. This function
// is called on _every_ request and populates
// the req.currentUser field with the logged-in
// user object based off the username provided
// in the session variable (accessed by the
// encrypted cookie).
app.use(function(req, res, next) {
    if (req.session.username) {
        User.findOne({username: req.session.username},
            function(err, user) {
                if (user) {
                    req.currentUser = user;
                } else {
                    req.session.destroy();
                }
                next();
            });
    } else {
        next();
    }
});


app.use('/', routes);
app.use('/users', users);
app.use('/tweets', tweets);
app.use('/all-tweets', allTweets);
app.use('/following-tweets', followingTweets);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;