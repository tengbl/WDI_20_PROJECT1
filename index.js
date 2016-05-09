alert("Welcome to Johnny's bubble game!' \n\nYour task is to help Johnny catch as many bubbles as you can. If more than 10 bubbles pop, Johnny dies and it becomes the next player's turn. \n\nClick 'Start the Game!' when ready. \n\nGOOD LUCK!");


var man_column = 0; 
var score = 0;
var poppedBubbles = 0;
var currentPlayer = "PlayerOne";

// MOVE MAN HORIZONTALLY
$(function() {
  $(document).keydown(function(e) {

     switch (e.which) {
       case 37:
        if (man_column > 0) {
          man_column--;
          $('#man').animate({
            left: (man_column * 40),
          }, 40); // LEFT
        }
       break;

       // case 38:
       // $('#man').animate({
       //  top: '+30px'
       // }); // UP
       // break;

       case 39:
       if(man_column < 19) {
        man_column++;
        $('#man').animate({
          left: (man_column * 40)
        }, 40); // RIGHT
       }
       break;

       // case 40:
       // $('#man').animate({
       //  top: '-30px'
       // }); // DOWN
       // break;
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


    $(bubble).css('left', x_pos + 'px');
    $(bubble).css('top', '-25px');
    $(bubble).css('background-color', 'rgb('+red+', '+green+', '+blue+')');

    $('#main-container').append(bubble);
    $(bubble).animate( 
      {top: '470px'},
      duration * 1, 
      "linear",
      function () { bubbleHit(bubble, column, duration); }
    );
  }


  // START GAME (music + balldrops)
  window.addEventListener("DOMContentLoaded", function(event) {

  start_button.addEventListener("click", startGame)
  
  });

  function startGame() {
    console.log(currentPlayer)
    nextDrop(2000 , 2500);
    
    // var audio = document.getElementById("background_music");
    // audio.src = "sounds/bubble_game2.m4a";
    // audio.play();
  }

  function nextDrop(duration , interval) {

    var bubbleDrop = setTimeout(function(){

      dropBubble(Math.floor(Math.random()*20), duration);
      nextDrop(duration , interval - 40 );

    } , interval);

    if (poppedBubbles >= 10) {

    }

  }


// determine where bubble is caught or lost
function bubbleHit(bubble, column, duration) {
  console.log("hello");

  if (man_column == column) {
    score++;
    new Audio("sounds/catch.wav").play();
    $(bubble).remove();
  }
  else {
    score--;
    new Audio("sounds/bubble-pop.wav").play();
    poppedBubbles++;
    console.log(poppedBubbles);
    $('#missed-bubbles label').html(poppedBubbles);
    $(bubble).animate(
      {
        opacity: 0,
        width: '600px',
        height: '600px',
      },
      function () { $(bubble).remove(); }
    );
  }

  playerScore();

  // SCOREBOARD
  function playerScore() {
    document.getElementById("score_dynamic").innerHTML = score;
  }

}


function endGame() {
  if (currentPlayer === "playerOne") {
    currentPlayer = "playerTwo";
    start_button.addEventListener("click", function() {
      startGame();
    });
  }
}


// MAX 10 pops before next player - Alert when game over 
// Move on to next player? How score high score?
// sound when bubble caught / missed? (+ mute music)?
// how use fancyapp?



/// RESET BUTTON??

function addResetListener(){
  var resetButton = document.getElementById("reset_button");
  resetButton.addEventListener("click", resetPage);
}
