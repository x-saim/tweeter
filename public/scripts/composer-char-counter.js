$(document).ready(function() {

  $(".new-tweet textarea").on("input", function() {
    console.log(140-$(this).val().length)
  });

});
