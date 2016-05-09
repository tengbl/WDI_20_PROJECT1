alert("Welcome to Johnny's bubble game!' \n\nHelp Johnny catch as many bubbles as you can. If more than 10 bubbles pop, Johnny dies, and it becomes the next player's turn.\n\nGOOD LUCK!");


var man_column = 0; 
var score = 0;
var poppedBubbles = 0;
var currentPlayer = "PlayerOne";
var highScore = localStorage.getItem("high_score");


// MOVE MAN HORIZONTALLY
$(function() {

  $("#high_score_dynamic").html(highScore);

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
    nextDrop(1500 , 2500);
    
  }

  function nextDrop(duration , interval) {

    if (poppedBubbles < 9) {
    
      var bubbleDrop = setTimeout(function(){
        dropBubble(Math.floor(Math.random()*20), duration);
        nextDrop(duration - 5, interval - 30 );
      } , interval);
    
    } else {

      endGame();

    }
  }


// determine win or loss
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

}

// SCOREBOARD
function playerScore() {
  document.getElementById("score_dynamic").innerHTML = score;
}


function endGame() {

  if(score > highScore) {
    setHighScore(score);
  }

  if (currentPlayer === "playerOne") {
    currentPlayer = "playerTwo";
    start_button.addEventListener("click", function() {
      startGame();
    });
  }
}

function setHighScore(score) {
  
  highScore = score;
  localStorage.setItem("high_score", score);
  $("#high_score_dynamic").html(highScore);

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
