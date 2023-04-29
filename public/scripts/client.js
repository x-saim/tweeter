/* global document, $,timeago */

/**
  * @function createTweetElement()
  * Creates a tweet element based on the tweet object.
  * @param {Object} tweetObject - The tweet object containing user information and tweet content.
  * @param {Object} tweetObject.user - The user object containing user information.
  * @param {string} tweetObject.user.name - The name of the user.
  * @param {string} tweetObject.user.handle - The handle of the user.
  * @param {string} tweetObject.user.avatars - The URL of the user's avatar image.
  * @param {Object} tweetObject.content - The tweet content object.
  * @param {string} tweetObject.content.text - The text content of the tweet.
  * @param {string} tweetObject.created_at - The date and time when the tweet was created.
  * @returns {JQuery<HTMLElement>} - A jQuery object representing the tweet element.
  */
const createTweetElement = (tweetObject) => {
  const $userName = $(`<p id="user-name">${tweetObject["user"]["name"]}</p>`);
  const $userHandle = $(`<a id="user-handle">${tweetObject.user.handle}</a>`);
  const $avatars = $(`<img src="${tweetObject.user.avatars}" alt="my avatar" width="50" height="50">`);

  //preventing XSS with escaping using .text method
  const $text = $("<p>").text(tweetObject.content.text);

  const $createdAt = $(`<p>${timeago.format(tweetObject.created_at)}</p>`);

  //tweet container structure
  const $tweet = $("<article>").addClass("tweet");

  //header structure
  const $header = $("<header>");
  const $userInfo = $("<div>").addClass("user-info");
  const $userHandleCont = $("<div>").addClass("user-handle");
  $header.append($userInfo).append($userHandleCont);

  //appending from tweet object
  $userInfo.append($avatars);
  $userInfo.append($userName);
  $userHandleCont.append($userHandle);

  //tweet content structure
  const $content = $("<div>").addClass("content");
  $content.append($text);

  //footer structure
  const $footer = $("<footer>");
  const $time = $("<div>").addClass("time");
  const $icons = $("<div>").addClass("icons");
  const $flag = $("<a>").addClass("flag").html(`<i class="fa-solid fa-flag"></i>`);
  const $retweet = $("<a>").addClass("retweet").html(`<i class="fa-solid fa-retweet"></i>`);
  const $like = $("<a>").addClass("like").html(`<i class="fa-solid fa-heart"></i>`);
  $icons.append($flag).append($retweet).append($like);
  $time.append($createdAt);
  $footer.append($time).append($icons);


  $tweet.append($header);
  $tweet.append($content);
  $tweet.append($footer);

  return $tweet;
};

/**
* @function renderTweets()
* Renders an array of tweet objects by creating a tweet element for each one and appending it to the #tweets-container element.
* @param {Array} arrayTweetObjects - The array of tweet objects to be rendered.
*/
const renderTweets = (arrayTweetObjects) => {
  //empties the tweets-container element in the HTML document. This will remove any previously rendered tweets to avoid duplication/repetition of tweet database.
  $("#tweets-container").empty();
  for (const e of arrayTweetObjects) {
    const $tweet = createTweetElement(e);
    //adds tweet to the top of the tweet container
    $('#tweets-container').prepend($tweet);
  }
};

/**
* @function loadTweets
* Loads tweets from the server using jQuery GET request and renders them on the page. Renders the tweets on the page. Handles errors that occur during the GET request.
**/

const loadTweets  = () => {
  $.get('/tweets')
    .then(res => renderTweets(res))
    .catch(err => console.log(err));
};

const errorsObj = {
  error1: {
    desc: "empty tweet",
    emptyTweet: function() {
      $("#error").addClass("invalid").text("Error: Unable to submit an empty tweet.").slideDown("slow");
      $.ajax({
        url:"/",
        method: "GET",
        success: function() {
          console.log("Error: Unable to submit an empty tweet.");
        }
      });
  }
  },
  error2: {
    desc: "tweet passed character limit",
    longTweet: function() {
      $("#error").addClass("invalid").text("Error: Unable to submit tweet. User passed character limit of 140.").slideDown("slow");
      $.ajax({
        url:"/",
        method: "GET",
        success: function() {
          console.log("Error: Unable to submit tweet. User passed character limit of 140.");
        }
      });
    }
  }
}


$(document).ready(function() {

  //function call to load tweets from database.
  loadTweets();

  /**
   * A submit event listener for the #tweet-form element to send a POST request to the /tweets endpoint with the serialized form data.
   
  */

  $("#tweet-form").submit(function(e) {
    e.preventDefault();

    const textInput = $(this).find('#tweet-text').val();
    //const $errorElem = $("#error");
    if (textInput === "" || textInput === null) {
      errorsObj.error1.emptyTweet();
    } else if (textInput.length > 140) {
      errorsObj.error2.longTweet();

      //this "else" conditional statement will clear any error notifications and send POST req to load updated tweet database.
    } else {
      $errorElem.hide("slow");
      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: $(this).serialize(),
        success: function() {
          //sets the value of the textarea to empty.
          $('#tweet-text').val('');
          //sets the value of the counter to default value of 140.
          $(".counter").text("140");
          loadTweets();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  });

  /* Tweet form toggle
  * Enables the "Write a new tweet" block to create a toggle feature for the tweet form area, allowing it to become in focus and toggle on and off.
  */
  $(".new-tweet-header").click(function() {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });
  
});