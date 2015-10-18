Handlebars.registerPartial('tweet', Handlebars.templates['tweet']);
Handlebars.registerPartial('all-tweet', Handlebars.templates['all-tweet']);
Handlebars.registerPartial('following-tweet', Handlebars.templates['following-tweet']);
Handlebars.registerHelper('isFollowing', function(following, currentUser, username){
	if((following.indexOf(username) === -1) && (currentUser !== username)){
		return new Handlebars.SafeString("<"+"a href='#' class='follow-user'>follow<"+"/a>");
	}
});
Handlebars.registerHelper('retweet', function(currentUser, username){
	if(currentUser !== username){
		return new Handlebars.SafeString("<"+"a href='#' class='retweet'>retweet<"+"/a>")
	}
});
Handlebars.registerHelper('tweetedBy', function(username, creator){
	if(username !== creator){
		return new Handlebars.SafeString("<h6"+">RT@"+creator+"</h6");
	}
});
// Global variable set when a user is logged in. Note
// that this is unsafe on its own to determine this: we 
// must still verify every server request. This is just 
// for convenience across all client-side code.
currentUser = undefined;

var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function() {
	if (currentUser) {
		loadTweetsPage();
	} else {
		loadPage('index');
	}
};

var loadTweetsPage = function() {
	$.get('/tweets', function(response) {
		loadPage('tweets', { tweets: response.content.tweets, currentUser: currentUser });
	});
};

var loadAllTweetsPage = function() {
	$.get('/all-tweets', function(response) {
		loadPage('all-tweets', {tweets: response.content.tweets, currentUser: currentUser, following: response.content.following});
	});
};


$(document).ready(function() {
	$.get('/users/current', function(response) {
		if (response.content.loggedIn) {
			currentUser = response.content.user;
		}
		loadHomePage();
	});
});

$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});