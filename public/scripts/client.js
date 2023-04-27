/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global document, $,timeago */

$(document).ready(() => {
  /**
 * Creates a tweet element based on the tweet object passed in.
 *
 * @param {Object} tweetObject - The tweet object containing information about the tweet.
 * @param {Object} tweetObject.user - The user object containing information about the tweet author.
 * @param {string} tweetObject.user.name - The name of the tweet author.
 * @param {string} tweetObject.user.handle - The handle of the tweet author.
 * @param {string} tweetObject.user.avatars - The URL of the tweet author's avatar.
 * @param {Object} tweetObject.content - The content object containing information about the tweet content.
 * @param {string} tweetObject.content.text - The text of the tweet content.
 * @param {string} tweetObject.created_at - The date and time when the tweet was created.
 *
 * @returns {jQuery} Returns a jQuery object that represents the tweet element.
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
 * Renders an array of tweet objects by creating a tweet element for each one and appending it to the #tweets-container element.
 *
 * @param {Array} arrayTweetObjects - The array of tweet objects to be rendered.
 */
  const renderTweets = (arrayTweetObjects) => {
    for (const e of arrayTweetObjects) {
      const $tweet = createTweetElement(e);
      $('#tweets-container').prepend($tweet); //adds to the top of the tweet container
    }
  };
  
  /**
   * Attach a submit event listener to the #tweet-form element and send a POST request to the /tweets endpoint with the serialized form data.
   
   * @function
   * @param {Event} e - The submit event object.
   * @param {string} url - The URL to send the request to.
   * @param {string} method - The HTTP method to use for the request.
   * @param {string} data - The tweet form data serialized as a string.
   * @param {function} success - A callback function to be executed if the request succeeds.
   * @param {function} error - A callback function to be executed if the request fails.
   *
   * Loads tweets from the server using jQuery GET request and renders them on the page. Renders the tweets on the page. Handles errors that occur during the GET request.
   * @function loadTweets
   */

  $("#tweet-form").submit(function(e) {
    e.preventDefault();

    const textInput = $(this).find('#tweet-text').val();
    const $errorElem = $("#error");
    if (textInput === "" || textInput === null) {
      $errorElem.addClass("invalid").text("Error: Unable to submit an empty tweet.").slideDown("slow");
      $.ajax({
        url:"/",
        method: "GET",
        success: function() {
          console.log("Error: Unable to submit an empty tweet.");
        }
      });
    } else if (textInput.length > 140) {
      $errorElem.addClass("invalid").text("Error: Unable to submit tweet. User passed character limit of 140.").slideDown("slow");
      $.ajax({
        url:"/",
        method: "GET",
        success: function() {
          console.log("Error: Unable to submit tweet. User passed character limit of 140.");
        }
      });
      //this conditional statement will clear any error notifications and sent POST req.
    } else {
      $errorElem.hide("slow");
      const tweetInput = $(this).serialize();

      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: tweetInput,
        success: function() {
          console.log("Sucessfully sent POST request to server.");
          $('#tweet-text').val('');
          const loadTweets  = () => {
            $.get('/tweets')
              .then(response => renderTweets(response))
              .catch(err => console.log(err));
          };
          loadTweets();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  });

  // Form toggle
  $(".new-tweet-header").click(function() {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });
  
});