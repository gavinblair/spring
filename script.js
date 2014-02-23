var URL = "0Ai6FEf_e95YqdGZLU0NLOTktM3NlbWFORmprYlRhNlE";
    var gifs;
    var sounds;

  document.addEventListener('DOMContentLoaded', function() {
    $("#container").html(ich.getproject);
    gifs = [
      {gif: 'http://i.imgur.com/ygfIfK8.gif', shown: false},
      {gif: 'http://i.imgur.com/6h5d6FX.gif', shown: false},
    ];
    $(gifs).preload();

    showNextGif();
    
    $(document).bind("touchstart click", function(){
        if($("body").css("background-size") === "cover"){
            $("body").css("background-size", "contain");
        } else {
            $("body").css("background-size", "cover");
        }
    });
    
  });

  function showNextGif(){
    var found = false;
    for(var i in gifs){
      if(gifs[i].shown === undefined || !gifs[i].shown){
        gifs[i].shown = true;
        $("body").css("background-image", "url("+gifs[i].gif+")");
        found = true;
        break;
      }
    }
    if(!found){
      for(var i in gifs){
        gifs[i].shown = false;
      }
      setTimeout(function(){
        showNextGif();
      }, 1000);
    } else {
      setTimeout(function(){
        showNextGif();
      }, 10000);
    }
  }
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this.gif;
    });
}
