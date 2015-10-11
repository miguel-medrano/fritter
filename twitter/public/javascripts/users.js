// Wrap in an immediately invoked function expression.
(function() {
  $(document).on('submit', '#signin-form', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/login',
          helpers.getFormData(this)
      ).done(function(response) {
          currentUser = response.content.user;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('submit', '#register-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      $.post(
          '/users',
          formData
      ).done(function(response) {
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#logout-link', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/logout'
      ).done(function(response) {
          currentUser = undefined;
          loadHomePage();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('click', '#all-tweets-link', function(evt) {
      evt.preventDefault();
      console.log("HEHA");
      $.get('all-tweets', function(response) {
          loadPage('all-tweets', {tweets: response.content.tweets})
      });
  });

  $(document).on('click', '#my-tweets-link', function(evt) {
      evt.preventDefault();
      console.log("YAS orZ");
      $.get('tweets', function(response) {
          loadPage('tweets', {tweets: response.content.tweets})
      });
  });

})();