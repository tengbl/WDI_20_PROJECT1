// alert("Welcome to Johnny's bubble game!' \n\nHelp Johnny catch as many bubbles as you can. If more than 10 bubbles pop, Johnny dies, and it becomes the next player's turn.\n\nGOOD LUCK!");



// global variables
var man_column = 0; 
var score = 0;
var poppedBubbles = 0;
// var currentPlayer = "PlayerOne";
var highScore = localStorage.getItem("high_score");


$(function() {

  $("#fancybox_intro").fancybox().click();

  $('#start_button').click(function(e) {
    e.stopPropagation();
    $.fancybox.close();
  })

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

       case 38:
       $('#man').animate({
        bottom: '+=30px'
       });

       setTimeout(function() {
        $('#man').animate({
         bottom: '-=30px'
        });
       }, 500) // UP

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


// START GAME 
window.addEventListener("DOMContentLoaded", function(event) {

start_button.addEventListener("click", startGame)

});

function startGame() {
  nextDrop(1800 , 2500);
  
}

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


// interval / timing of bubbles
  function nextDrop(duration , interval) {

    if (poppedBubbles < 10) {
    
      var bubbleDrop = setTimeout(function(){
        dropBubble(Math.floor(Math.random()*20), duration);
        nextDrop(duration - 5, interval - 30 );
      } , interval);
    
    } else {

      $(".bubble").stop();
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
    $(".final_score").html(score);
    $("#fancybox_high_score").fancybox().click();
  }
  else {
    $(".final_score").html(score);
    $("#fancybox_gameOver").fancybox().click();
  }

}

function setHighScore(score) {
 
  highScore = score;
  localStorage.setItem("high_score", score);
  $("#high_score_dynamic").html(highScore);

}


// RESET GAME
window.addEventListener("DOMContentLoaded", function(event) {
$('.reset_button button').on("click", function(e) {
  e.stopPropagation();
  $.fancybox.close();

  score = 0;
  $('#score_dynamic').html(score);

  poppedBubbles = 0;
  $('#missed-bubbles label').html(poppedBubbles);

  startGame();
})

});

function startGame() {
  nextDrop(1800 , 2500);
}




/// Jump (limited)!
/// Play again button