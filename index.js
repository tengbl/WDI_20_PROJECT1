

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
