//-------Variables-------//
  //Video
  var video = document.getElementById("video");
  //Buttons
  var playButton = document.getElementById("play-pause");
  var volumeButton = document.getElementById("volume");
  var fullScreenButton = document.getElementById("full-screen");
  //Slider
  var seekBar = document.getElementById("seek-bar");
  var time = document.getElementById("time");


//-------Functions-------//
  //Gets current time and formats it.
var setTime = function(timeToReport) {
  var vidTime = timeToReport;
  var sec = Math.floor(vidTime);
  var msec = Math.round(vidTime%1*100);
  
  if (sec === 0) {
    sec = "00";
    sec.toString();
  } else if (sec < 10) {
    sec = "0" + sec;
    sec.toString();
  }
    
 if (msec === 0) {
    msec = "00";
    msec.toString();
  }  else if (msec < 10) {
    msec = "0" + msec;
    msec.toString();
  }
  
  return sec + ":" + msec;
};


//-------BUTTONS-------//
//Hover
$(".video-container").mouseleave(function(){
  $(".control-buttons").css("display", "none");
  $(".video-controls").css("top", "-15px");
    });

$(".video-container").mouseenter(function(){
  $(".control-buttons").css("display", "block");
  $(".video-controls").css("top", "-63px");
});


//Toggle play/pause icons when button pushed
$(playButton).click(function() {
  if (video.paused === true) {
    video.play();
    playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  } else {
    video.pause();
    playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }

});



//Toggle volume button when volume button pushed
$(volumeButton).click(function() {
  if (video.muted === false) {
    video.muted = true;
    //When muted, use icon 
    volumeButton.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
  } else {
    video.muted = false;
    volumeButton.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
  }
});

//toggle to full screen or not when button pushed
$(fullScreenButton).click(function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); //Firefox
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen(); //Chrom and Safari
  }
});

//-------Timing and Captions-------//

setInterval(function() {
  //Display time played in video
  var vid = video.currentTime;
  var dur = video.duration;
  var timeDisplay = setTime(vid) + " / " + setTime(dur);
  $(time).html(timeDisplay);

  //Update seekBar.val to reflect currentTime;
  var seek = (vid/dur).toFixed(2);
  var seekBarValue = Math.floor(seek * 100);
  $(seekBar).val(seekBarValue);
  
  //Move caption highlight
  captions();
}, 15);


//-------Jump to Spot-------//
$(seekBar).click( function(e) {
  var width = ($(seekBar).width());
  if(!video.paused && !video.ended){
    var mouseX = e.pageX-seekBar.offsetLeft;
    var newtime = mouseX*video.duration/width;
    video.currentTime = newtime;
  }
});



