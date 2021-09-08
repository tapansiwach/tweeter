/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = tweetObj => {
  const $tweet = $(`<article class="tweet">Hello world</article>`);
  $tweet.innerHTML = `
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
      ${tweetObj.created_at}
        <div class="tweet-icons">
          <i class="far fa-flag"></i>
          <i class="hidden fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="far fa-heart"></i>
          <i class="hidden fas fa-heart"></i>
        </div>
      </footer>
  `;
  console.log($tweet);
  return $tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
