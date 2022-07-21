const charMax = 140;

$(document).ready(function() {
  // Calculates the amount of characters in the create tweet textarea
  // if more than 140 the counter turns red
  $( '#tweet-text' ).keyup(function() {

    const charCounter = $( this ).parent().children( 'div' ).children( '.counter' );
    const charAmount = $( this ).val().length;
    const remainingChar = charMax - charAmount;

    charCounter.val(remainingChar);

    if (charCounter.val() < 0) {
      charCounter.addClass('text-red');
    } else if (charCounter.val() > -1) {
      charCounter.removeClass('text-red');
    }
  });
  
});