/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  console.log('ready');
  const tweetData = 
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1682007053297
    }

const createTweetElement = (tweetObject) => {

 // let relativeTime = moment(tweetObject["created_at"], "YYYYMMDD").fromNow();

  const $userName = $(`<p id="user-name">${tweetObject["user"]["name"]}</p>`);
  const $userHandle = $(`<a id="user-handle">${tweetObject["user"]["handle"]}</a>`);
  const $avatars = $(`<img src="${tweetObject["user"]["avatars"]}" width="50" height="50">`);
  const $text = $(`<p>${tweetObject["content"]["text"]}</p>`);
  const $createdAt = $(`<p>${tweetObject["created_at"]}</p>`);

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

  
  $tweet.append($header)
  $tweet.append($content);
  $tweet.append($footer);


  return $tweet
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  });

