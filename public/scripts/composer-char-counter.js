$(document).ready(function() {
  console.log("ready");

  $(".new-tweet textarea").on("keyup", (event) => {
    console.log(event.type)
  })
  
});
