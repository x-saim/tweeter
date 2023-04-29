/* global document, $ */
$(document).ready(function() {
  const maxCharCount = 140;
  $(".new-tweet textarea").on("input", function() {
    //traverse down DOM Tree
    let counter = $(this).siblings(".new-tweet-footer").find(".counter");
    let charCount = maxCharCount - $(this).val().length;

    //set new value to counter text
    counter.text(charCount);
 
    //condition for turning char count red
    if (charCount < 0) {
      counter.addClass("invalid");
    } else {
      counter.removeClass("invalid");
    }
    
  });

});
