$(document).ready(function() {

  $(".new-tweet textarea").on("input", function() {
    let counter = $(this).siblings(".new-tweet-footer").find(".counter");
    counter.text(140 - $(this).val().length);
  });

});
