// GLOBAL VARIABLES
var man_column    = 0; 
var score         = 0;
var poppedBubbles = 0;
var flag = true;
var myAudio = new Audio("sounds/bad-boys.wav")

var highScore = localStorage.getItem("high_score");


$(function() {


  //FANCYBOX
  $("#fancybox_intro").fancybox().click();

  $('#start_button').click(function(e) {
    e.stopPropagation();
    $.fancybox.close();
  })

  $("#high_score_dynamic").html(highScore);

  // HORIZONTAL MOVEMENT
  $(document).keydown(function(e) {

     switch (e.which) {
       case 37:
       flag = true;
        if (man_column > 0) {
          man_column--;
          $('#man').animate({
            left: (man_column * 40),
          }, 40); // LEFT
        }
       break;

       case 38:
       if (flag) {
        $('#man').animate({
         bottom: '+=30px'
        });

        $('*').off('keydown');
        setTimeout(function() {
         $('#man').animate({
          bottom: '-=30px'
         });
        }, 500) // UP
       }

       flag = false

       
       break;

       case 39:
       flag = true;
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


// startGame: START GAME 
window.addEventListener("DOMContentLoaded", function(event) {

start_button.addEventListener("click", startGame)

});

function startGame() {

  myAudio.play();
  myAudio.loop = true;

  nextDrop(1800 , 1800);
}

// dropBubble: DROP BUBBLE ON CLICK
function dropBubble(column, duration) {
  var bubble = $.parseHTML('<div class="bubble"></div>');

  var x_pos = 40 * column;

  // ASSIGN PROPERTIES TO BUBBLES
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


// nextDrop: INTERVAL / TIMING OF BUBBLES
  function nextDrop(duration , interval) {

    if (poppedBubbles < 10) {
    
      var bubbleDrop = setTimeout(function(){
        dropBubble(Math.floor(Math.random()*20), duration);
        nextDrop(duration - 10, interval - 40 );
      } , interval);
    
    } else {

      $(".bubble").stop();
      $(".bubble").remove();
      endGame();

    }
  }


// bubbleHit: DETERMINE WIN OR LOSS
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

    $('#popped-bubbles label').html(poppedBubbles);
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
  $('#popped-bubbles label').html(poppedBubbles);


  startGame();

});

});

