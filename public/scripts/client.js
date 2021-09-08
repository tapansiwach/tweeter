/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// // Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]


const createTweetElement = tweetObj => {
  const $tweet = $(`<article class="tweet"></article>`);
  $tweet.append(`
      <header>
        <div>
          <img class="face" src=${tweetObj.user.avatars} alt="">
          <span class="user-name">${tweetObj.user.name}</span>
        </div>
        <span class="user-handle">${tweetObj.user.handle}</span>
      </header>
      <p>${tweetObj.content.text}</p>
      <hr>
      <footer>
      ${timeago.format(tweetObj.created_at)}
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
  for (const item of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(item);
    // takes return value and appends it to the tweets container
    $('#tweets').append($tweet);
  }
}


// renderTweets(data);


// add an event listener for form submissions
$('.new-tweet form').on('submit', function(event) {
  event.preventDefault();
  const queryString = $(this).serialize();

  const text = this.text.value;
  if (text === '') {
    alert('tweet input field is empty');
  } else if (text.length > 140) {
    alert('length of tweet is more than 140 characters');
  } else {
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