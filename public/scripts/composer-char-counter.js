$(document).ready(function() {
  console.log("ready");

  $(".new-tweet textarea").on("blur", (event) => {
    console.log(event.type)
  });
  $(".new-tweet textarea").on("keyup", (event) => {
    console.log(event.type)
  });

  $(".new-tweet textarea").on("keydown", (event) => {
    console.log(event.type)
  });

  $(".new-tweet textarea").on("keypress", (event) => {
    console.log(event.type)
  });

  $(".new-tweet textarea").on("input", (event) => {
    console.log(event.type)
  });

});
