/* global document, $, window */

$(document).ready(function() {
/**
 * Attach a scroll event listener to the window object. If the current vertical scroll position of the window is greater than 20 pixels, display a button with the ID "topBtn" and hide the "nav" element. Otherwise, hide the "topBtn" button and show the "nav" element.
 *
 */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $('#topBtn').css("display","block"); //enables the navigation to the top buttom
      $("nav").css("background-color","transparent") //turns nav background transparant on scroll
      $(".new-tweet-header").hide(); //hides the compose block in nav on scroll
    } else {
      $('#topBtn').css("display","none");
      $("nav").css("background-color","#4056A1")
      $(".new-tweet-header").show();

    }
  });


  /*
  Binds a click event to the #topBtn element that animates the page scroll to the top, slides down the .new-tweet element or tweet box element, focuses on the #tweet-text element, changes the background color of the <nav> element to be visible, shows a .new-tweet-header element, and returns false to prevent the default behavior.
  */

  $("#topBtn").click(function() {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();

    $("nav").css("background-color","#4056A1")
    $(".new-tweet-header").show();
    return false;
  });
});