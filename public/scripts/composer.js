$(document).ready(function() {

  // Scroll event for back to the top button
  // Show the button when the user scrolls down 20px from the top of the document
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