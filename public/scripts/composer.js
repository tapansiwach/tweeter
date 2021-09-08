const fab = $('.action');

// when window is scrolled down, display the action button
$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    fab.removeClass('hidden');
  } else {
    fab.addClass('hidden');
  }
});


// when button is clicked, scroll to top
fab.on('click', function(event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, 500)
  return false;
});
