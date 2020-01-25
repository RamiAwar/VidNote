

let video = document.querySelector('video');

// Temporary object to house multiple video related variables every session, maybe turn into class if gets too big
video_container = {
     video : video,
     ready : false,   
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var dragging = false;


// Buttons
var play_button = document.getElementById("play-pause");
var mute_button = document.getElementById("mute");

// Sliders
var seekBar = document.getElementById("seek-bar");
var volumeBar = document.getElementById("volume-bar");
update_volume_slider();

exports.initialize_canvas_video = function(window_size){

	canvas.addEventListener('mousedown', mouse_down, false);
	canvas.addEventListener('mouseup', mouse_up, false);
	canvas.addEventListener('mousemove', mouse_move, false);

	canvas.addEventListener("click", toggle_play_pause, false);

	// set canvas size = video size when known
	video.addEventListener('loadedmetadata', function() {
    var aspect_ratio = video.videoWidth/video.videoHeight;
	  canvas.width = window_size[0] - 255;
	  canvas.height = canvas.width/aspect_ratio;
    if(canvas.height > window_size[1] - 110){
      canvas.height = window_size[1] - 110;
      canvas.width = canvas.height*aspect_ratio;
    }

	});

	video.oncanplay = video_ready;

	video.addEventListener('play', function(){
		var $this = this; //cache
	    (function loop() {
	      if (!$this.paused && !$this.ended) {
	        ctx.drawImage($this, 0, 0, canvas.width, canvas.height);
	        //TODO: ???
          //seekBar.
	        requestAnimationFrame(loop); 
	      }	
	    })();

	}, 0);

}

function mouse_down(e){
	rect.start_x = e.pageX - canvas.offsetLeft;
	rect.start_y = e.pageY - canvas.offsetTop;
}

function mouse_up(e){

}

function mouse_move(e){

}


function toggle_play_pause(e){

}

function drawPlayIcon(e){

    ctx.fillStyle = "black";  // darken display
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#DDD"; // colour of play icon
    ctx.globalAlpha = 0.75; // partly transparent
    ctx.beginPath(); // create the path for the icon
    var size = (canvas.height / 3) * 0.3;  // the size of the icon
    ctx.moveTo(canvas.width/2 + size/3, canvas.height / 2); // start at the pointy end
    ctx.lineTo(canvas.width/2 - size/3, canvas.height / 2 + size/2);
    ctx.lineTo(canvas.width/2 - size/3, canvas.height / 2 - size/2);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1; //restore alpha
} 


function toggle_play_pause(){
     if(video_container !== undefined && video_container.ready){
          if(video_container.video.paused){                                 
                video_container.video.play();
          }else{
                video_container.video.pause();
          }
          toggle_play(play_button);
     }
}

function video_ready(event){ // this is a referance to the video
    // the video may not match the canvas size so find a scale to fit
    video_container.scale = Math.min(
                         canvas.width / this.videoWidth, 
                         canvas.height / this.videoHeight); 
    video_container.ready = true;

    // the video can be played so hand it off to the display function
    requestAnimationFrame(updateCanvas);

    seekBar.value = 0;
    update_seekbar();
}

function updateCanvas(){

    ctx.clearRect(0,0,canvas.width,canvas.height); 
    // only draw if loaded and ready
    if(video_container !== undefined && video_container.ready){ 
        // find the top left of the video on the canvas
        var scale = 3;
        var aspect_ratio = (video_container.video.videoWidth/video_container.video.videoHeight).toPrecision(3);
        var vidH = canvas.height - 100;
        var vidW = parseInt(vidH*aspect_ratio);
        var top = canvas.height / 2 - (vidH /2 ) * scale;
        var left = canvas.width / 2 - (vidW /2 ) * scale;
        // now just draw the video the correct size
        ctx.drawImage(video_container.video, 0, 0, canvas.width, canvas.height);
        if(video_container.video.paused){ // if not playing show the paused screen 
            drawPlayIcon();
        }
    }
    // all done for display 
    // request the next frame in 1/60th of a second
    requestAnimationFrame(updateCanvas);
}

//Video player controls
$(document).keypress(function (e) {
  
  if (e.key === ' ' || e.key === 'Spacebar') {
    // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
    e.preventDefault()
    play_button.click();
  }
	
})


// Event listener for the play/pause button
play_button.addEventListener("click", function() {
  if (video.paused == true) {
    // Play the video
    video.play();
    
  } else {
    // Pause the video
    video.pause();
  }
  toggle_play(play_button);
});

// Event listener for the mute button
mute_button.addEventListener("click", function() {
  if (video.muted == false) {

    // Mute the video
    video.muted = true;

  } else {

    // Unmute the video
    video.muted = false;
  }
  toggle_mute();

});

// Event listener for the seek bar
seekBar.addEventListener("change", function() {
	
	// Calculate the new time
	var time = video.duration * (seekBar.value / 100);

	// Update the video time
	video.currentTime = time;
});

// Update the seek bar as the video plays
video.addEventListener("timeupdate", function() {
  // Calculate the slider value
  var value = (100 / video.duration) * video.currentTime;

  // Update the slider value
  seekBar.value = value;

  update_seekbar();

});

// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
  video.pause();
});


// Play the video when the slider handle is dropped
// seekBar.addEventListener("mouseup", function() {
//   video.play();
// });

// Event listener for the volume bar
volumeBar.addEventListener("change", function() {
  // Update the video volume
  video_container.video.volume = volumeBar.value/100;
});

// Slider styling

$('#seek-bar').on("change mousemove", function () {

    update_seekbar();
});

$('.volume-slider').on("change mousemove", function () {

    update_volume_slider();

});

function toggle_mute(){

	if(video.muted){
		//set icon to muted
		$('#mute-icon').removeClass('fa-volume-up');
		$('#mute-icon').addClass('fa-volume-off');
	}else{
		//set icon to mutable
		$('#mute-icon').addClass('fa-volume-up');
		$('#mute-icon').removeClass('fa-volume-off');
	}
}

function toggle_play(){
	if(video_container.video.paused){
		//set icon to playable
		$('#play-icon').removeClass('fa-pause');
		$('#play-icon').addClass('fa-play');
	}else{
		//set icon to pausable
		$('#play-icon').addClass('fa-pause');
		$('#play-icon').removeClass('fa-play');
	}
}

function update_seekbar(){

	var val = ($('#seek-bar').val() - $('#seek-bar').attr('min')) / ($('#seek-bar').attr('max') - $('#seek-bar').attr('min'));
    
    $('#seek-bar').css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #6297f8), '
                + 'color-stop(' + val + ', #aaa)'
                + ')'
                );
}


function update_volume_slider(){

	var val = ($('.volume-slider').val() - $('.volume-slider').attr('min')) / ($('.volume-slider').attr('max') - $('.volume-slider').attr('min'));
    
    $('.volume-slider').css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #6297f8), '
                + 'color-stop(' + val + ', #aaa)'
                + ')'
                );
}