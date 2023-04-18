$(document).ready(function() {
  console.log("ready");

  $(".new-tweet textarea").on("input", function() {
    console.log(this)
  });

  $(".new-tweet textarea").on("input", function() {
    console.log($(this).val().length)
  });

});
