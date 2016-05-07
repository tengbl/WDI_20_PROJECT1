
// Background Music
window.addEventListener("DOMContentLoaded", function(event) {

start_button.addEventListener("click", function(){

var audio = document.getElementById("background_music");
audio.src = "sounds/bubble_game2.m4a";
audio.play();

});
});


// Moving man
$(function() {
  console.log("loaded")

  var pos = 0;

  $(document).keydown(function(e) {
    var man = parseInt($('#man').css("left"));

     switch (e.which) {
       case 37:
        if (pos > 0) {
          pos--;
          $('#man').animate({
            left: (pos * 30)
          });
        }
       break;
       // case 38:
       // $('#man').animate({
       //   top: '+=30px'
       //       }); //up
       // break;
       case 39:
       if(pos < 19) {
        pos++;
        $('#man').animate({
          left: (pos * 30)
        });
       }
       break;
       // case 40:
       // $('#man').animate({
       //   top: '+=30px'
       //       }); //bottom
       // break;
     }
 });
});



/// Reset button

function addResetListener(){
  var resetButton = document.getElementById("reset_button");
  resetButton.addEventListener("click", resetPage);
}
