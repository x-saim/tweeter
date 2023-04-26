$(document).ready(function() {

/**
 * Attach a scroll event listener to the window object. If the current vertical scroll position of the window is greater than 20 pixels, display a button with the ID "topBtn" and hide the "nav" element. Otherwise, hide the "topBtn" button and show the "nav" element.
 * 
 */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $('#topBtn').css("display","block");
      $("nav").css("display","none");
    } else {
      $('#topBtn').css("display","none");
      $("nav").css("display","flex");
    }
  })

  $("#topBtn").click(function() {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
    return false;
  })
})