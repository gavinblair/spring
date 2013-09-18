var URL = "0Ai6FEf_e95YqdGZLU0NLOTktM3NlbWFORmprYlRhNlE";
    var gData;
    var trickle;

  document.addEventListener('DOMContentLoaded', function() {
    $("#container").html(ich.getproject);
    Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } );
    NProgress.configure({ showSpinner: false, trickle: false });
    showNextGif();

    setInterval(function(){
      update();
    }, 20000); //20 seconds
    
    $(document).bind("touchstart click", function(){
        if($("body").css("background-size") === "cover"){
            $("body").css("background-size", "contain");
        } else {
            $("body").css("background-size", "cover");
        }
    });
    
  });

  function update(){
    Tabletop.init( { key: URL, callback: function(data){
      for(var i in data){
        //is it in already?
        var found = false;
        for(var j in gData){
          if(gData[j].gif === data[i].gif){
            found = true;
          }
        }
        if(!found){
          gData.push(data[i]);
        }
      }

    }, simpleSheet: true } );    
  }
    
  function showInfo(data) {
    // window.tabletopData = tabletop 
    gData = data;
    document.getElementById('container').innerHTML = ich.results();
    //preload the images
    var arrimages = [];
    for(var i in gData){
      arrimages.push(gData[i].gif);
    }
    $(arrimages).preload();
  }

  function showNextGif(){
    var found = false;
    for(var i in gData){
      console.log(i);
      if(gData[i].shown === undefined || !gData[i].shown){
        gData[i].shown = true;
        $("body").css("background-image", "url("+gData[i].gif+")");
        found = true;
        break;
      }
    }
    if(!found){
      for(var i in gData){
        gData[i].shown = false;
      }
      setTimeout(function(){
        showNextGif();
      }, 1000);
    } else {
      NProgress.start();
      clearInterval(trickle);
      trickle = setInterval(function(){
        NProgress.inc();
      }, 1000);
      setTimeout(function(){
        NProgress.done();
        showNextGif();
      }, 10000);
    }
  }
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}
