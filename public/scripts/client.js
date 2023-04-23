/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
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
    const $avatars = $(`<img src="${tweetObject.user.avatars}" width="50" height="50">`);
    const $text = $(`<p>${tweetObject.content.text}</p>`);
    const $createdAt = $(`<p>${tweetObject.created_at}</p>`);

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

    //content structure
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
      $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }

  renderTweets(data);
});

