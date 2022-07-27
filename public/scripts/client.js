// Constants for determining if textarea in new tweet form
const EMPTY_TWEET_CHAR_COUNT = 140;
const MAX_TWEET_CHAR_COUNT = 0;

// Creates an article for tweet object
const createTweetElement = (data) => {
  const newTweet = `
                  <article class="tweet">
                    <header class="flex-container-row">
                      <div class="profile-pic-username flex-container-row">
                        <img src="${data.user.avatars}"/>
                        <p>${data.user.name}</p>
                      </div>
                      <p class="handle">${data.user.handle}</p>
                    </header>
                    <section class="tweet-content">
                      <p>${data.content.text}</p>
                    </section>
                    <footer>
                      <p class="time-created">${timeago.format(data.created_at)}</p>
                      <div>
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </footer>
                  </article>
                  `;
  return newTweet;
};

// Loops through tweet database object, uses createTweetElement() to generate an article

const renderTweets = (data) => {
  for (let i = data.length - 1; i >= 0; i--) {
    const newTweet = createTweetElement(data[i]);
    $( '#tweets-container' ).append(newTweet);
  }
};

// renders the tweet as data

const renderTweet = (data) => {
  const newTweet = createTweetElement(data);
  $( '#tweets-container' ).prepend(newTweet);
};

// Makes get request to tweets database at /tweets and then render each tweet as an article.

const loadTweets = () => {
  $.get('/tweets').then((data) => {
    renderTweets(data);
    $( '#tweet-text' ).val('');
  });
};
 
// Makes get request to tweets database at /tweets and then renders most recent tweet

const loadNewTweet = () => {
  $.get('/tweets').then((data) => {
    renderTweet(data[data.length - 1]);
    $( '#tweet-text' ).val('');
    $( 'output.counter' ).val(140);
  });
};

$( document ).ready(function() {

  // Get tweets in database on page load

  loadTweets();
  $( '.new-tweet form' ).submit(function(event) {
    event.preventDefault();
    const tweetData = $( this ).serialize();
    const charCount = Number($( 'output.counter' ).val());
    // No characters in form
    if (charCount === EMPTY_TWEET_CHAR_COUNT) {
      alert("Please enter a tweet before tweeting!");
      return;
    // Max char count in form
    } else if (charCount < MAX_TWEET_CHAR_COUNT) {
      alert("Please keep tweet within 140 characters in length!");
      return;
    }

    // If char count is satisfied post the tweet to the database
    $.post('/tweets/', tweetData).then(() => {
      loadNewTweet();
    });
  });

});