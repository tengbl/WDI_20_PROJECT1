// alert("Welcome to Johnny's bubble game!' \n\nHelp Johnny catch as many bubbles as you can. If more than 10 bubbles pop, Johnny dies, and it becomes the next player's turn.\n\nGOOD LUCK!");



// global variables
var man_column = 0; 
var score = 0;
var poppedBubbles = 0;
// var currentPlayer = "PlayerOne";
var highScore = localStorage.getItem("high_score");


$(function() {

  $(#intro).fancybox().click();

  $("#high_score_dynamic").html(highScore);

  // moves man horizontally
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


// function to make bubble fall on click
function dropBubble(column, duration) {
  var bubble = $.parseHTML('<div class="bubble"></div>');

  var x_pos = 40 * column;

  // assigning properties to bubbles
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


  // START GAME 
  window.addEventListener("DOMContentLoaded", function(event) {

  start_button.addEventListener("click", startGame)
  
  });

  function startGame() {
    // console.log(currentPlayer)
    nextDrop(1500 , 2500);
    
  }

// interval / timing of bubbles
  function nextDrop(duration , interval) {

    if (poppedBubbles < 10) {
    
      var bubbleDrop = setTimeout(function(){
        dropBubble(Math.floor(Math.random()*20), duration);
        nextDrop(duration - 5, interval - 30 );
      } , interval);
    
    } else {

      $(".bubble").remove();
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
 
    $('#score_dynamic').html(score);
}


function endGame() {

  if(score > highScore) {
    setHighScore(score);
    alert("Congratulations! Your beat all other players with a new high score of " + score + "!");
  }
  else {
    $("<h1>Game Over!</h1>").fancybox().click();
  }

  // if (currentPlayer === "playerOne") {
  //   currentPlayer = "playerTwo";
  //   start_button.addEventListener("click", function() {
  //     startGame();
  //   });
  // }
}

function setHighScore(score) {
 
  highScore = score;
  localStorage.setItem("high_score", score);
  $("#high_score_dynamic").html(highScore);

}


/// GAME OVER statement
// How to use funapp and spritely
/// Pause
/// Title of game on page
/// "Play again"


//PAUSE BUTTON?

//RESET?



