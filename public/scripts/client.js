/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/


// handle cross site scripting XSS attacks by using the safe encoding 
// representation. eg: &lt;script&gt; instead of <script>.
//  .createTextNode() DOM method does this safe encoding 
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = tweetObj => {
  const $tweet = $(`<article class="tweet"></article>`);

  const escapedObject = {
    avatar: escape(tweetObj.user.avatars),
    name: escape(tweetObj.user.name),
    handle: escape(tweetObj.user.handle),
    text: escape(tweetObj.content.text),
    created_at: escape(tweetObj.created_at),
  };

  $tweet.append(`
      <header>
        <div>
          <img class="face" src=${escapedObject.avatar} alt="">
          <span class="user-name">${escapedObject.name}</span>
        </div>
        <span class="user-handle">${escapedObject.handle}</span>
      </header>
      <p>${escapedObject.text}</p>
      <hr>
      <footer>
      ${timeago.format(escapedObject.created_at)}
        <div class="tweet-icons">
          <i class="far fa-flag"></i>
          <i class="hidden fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
          <i class="hidden fas fa-heart"></i>
        </div>
      </footer>
  `);
  return $tweet;
};


const renderTweets = function(tweets) {
  // loops through tweets
  for (const item of tweets.reverse()) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(item);
    // takes return value and appends it to the tweets container
    $('#tweets').append($tweet);
  }
}


// add an event listener for form submissions
$('.new-tweet form').on('submit', function(event) {
  event.preventDefault();
  const queryString = $(this).serialize();

  const text = this.text.value;
  if (text === '') {
    // alert('tweet input field is empty');
    $('#error-alert').text('tweet input field is empty').slideDown('slow');
  } else if (text.length > 140) {
    $('#error-alert').text('length of tweet is more than 140 characters').slideDown('slow');
    // alert('length of tweet is more than 140 characters');
  } else {
    $('#error-alert').text('').slideUp('slow');
    $.post('/tweets', queryString, function(response) {
      console.log(response); // no response is coming back from the server
      // but the tweets are reaching the /tweets endpoint
      // varified by loading localhost:8080/tweets

      // after a tweet is created, refresh the page
      $("#tweets").empty();
      loadTweets();
    });
  }
  this.reset(); // use native javascript to reset values in form
});


// get tweets from server and render them to screen

const loadTweets = () => {
  $.get('/tweets', function(response) {
    renderTweets(response);
  });
}

loadTweets();