$(document).ready(function() {

  $(".new-tweet form textarea").on("input", function(event) {
    const remainingChars = 140 - this.value.length;
    const output = $(this).next().children()[1];
    output.textContent = remainingChars;
    output.style.color = remainingChars > 0 ? "black" : "red";
  });

});