
// BACGROUND MUSIC
window.addEventListener("DOMContentLoaded", function(event) {

start_button.addEventListener("click", function(){

var audio = document.getElementById("background_music");
audio.src = "sounds/bubble_game2.m4a";
audio.play();

});
});

/// MUTE MUSIC


var man_column = 0; 
var score = 0;
playerScore();

// MOVING MAN HORIZONTALLY
$(function() {
  $(document).keydown(function(e) {
    // var man = parseInt($('#man').css("left"));

     switch (e.which) {
       case 37:
        if (man_column > 0) {
          man_column--;
          $('#man').animate({
            left: (man_column * 40),
          }, 40); // LEFT
        }
       break;
       case 39:
       if(man_column < 19) {
        man_column++;
        $('#man').animate({
          left: (man_column * 40)
        }, 40); // RIGHT
       }
       break;
     }
 });
});


// FUNCTION TO MAKE BUBBLE FALL ON CLICK
function dropBubble(column, duration) {
  var bubble = $.parseHTML('<div class="bubble"></div>');

  var x_pos = 40 * column;

  // assigning different colors to bubbles
  var red   = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue  = Math.floor(Math.random() * 256);


  $(bubble).css('left', x_pos);
  $(bubble).css('top', '-25px');
  $(bubble).css('background-color', 'rgb('+red+', '+green+', '+blue+')');

  $('#main-container').append(bubble);
  $(bubble).animate( 
    {top: '480px'},
    duration * 1,
    "linear",
    function () { bubbleHit(bubble, column, duration); }
  );
}


// determine where bubble is caught or lost
function bubbleHit(bubble, column, duration) {
  console.log("hello");

  if (man_column == column) {
    score++;
    $(bubble).remove();
  }
  else {
    score--;
    $(bubble).animate(
      {
        opacity: 0,
        width: '400px',
        height: '400px',
      },
      function () { $(bubble).remove(); }
    );
  }
  console.log(score);
}
// 


// SCOREBOARD
function playerScore() {}
  document.getElementById("score_dynamic").innerHTML = score;



/// RESET BUTTON

function addResetListener(){
  var resetButton = document.getElementById("reset_button");
  resetButton.addEventListener("click", resetPage);
}
