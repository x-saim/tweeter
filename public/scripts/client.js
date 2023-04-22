/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  console.log('ready');
  $.getJSON("/home/labber/tweeter/server/data-files/initial-tweets.json", function(data) {
    console.log(data);
  });
});
