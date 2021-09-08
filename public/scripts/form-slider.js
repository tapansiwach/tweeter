$("nav div").on('click', function(event) {
  if ($(".new-tweet").is(":hidden")) {
    $(".new-tweet").slideDown();
  } else {
    $(".new-tweet").slideUp();
  }
});