$("nav .tweet-trigger").on('click', function(event) {
  const section = $(".new-tweet");
  if (section.is(":hidden")) {
    section.slideDown();
    $("#tweet-text").focus();
  } else {
    section.slideUp();
  }
});