
let video = document.querySelector('video');

video_container = {  // we will add properties as needed
     video : video,
     ready : false,   
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var rect = {};
var dragging = false;


exports.initialize_canvas_video = function(){

	canvas.addEventListener('mousedown', mouse_down, false);
	canvas.addEventListener('mouseup', mouse_up, false);
	canvas.addEventListener('mousemove', mouse_move, false);

	canvas.addEventListener("click", toggle_play_pause, false);

	// set canvas size = video size when known
	video.addEventListener('loadedmetadata', function() {
	  canvas.width = Math.min(video.videoWidth, 720);
	  canvas.height = Math.min(video.videoHeight, 720/(video.videoWidth/video.videoHeight));
	});

	video.oncanplay = video_ready;

	video.addEventListener('play', function(){
		var $this = this; //cache
	    (function loop() {
	      if (!$this.paused && !$this.ended) {
	        ctx.drawImage($this, 0, 0);
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
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#DDD"; // colour of play icon
    ctx.globalAlpha = 0.75; // partly transparent
    ctx.beginPath(); // create the path for the icon
    var size = (canvas.height / 3) * 0.5;  // the size of the icon
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
}

function updateCanvas(){

    ctx.clearRect(0,0,canvas.width,canvas.height); 
    // only draw if loaded and ready
    if(video_container !== undefined && video_container.ready){ 
        // find the top left of the video on the canvas
        var scale = 3;
        var vidH = video_container.video.videoHeight;
        var vidW = video_container.video.videoWidth;
        var top = canvas.height / 2 - (vidH /2 ) * scale;
        var left = canvas.width / 2 - (vidW /2 ) * scale;
        // now just draw the video the correct size
        ctx.drawImage(video_container.video, left, top, vidW * scale, vidH * scale);
        if(video_container.video.paused){ // if not playing show the paused screen 
            drawPlayIcon();
            console.log("jkk");
        }
    }
    // all done for display 
    // request the next frame in 1/60th of a second
    requestAnimationFrame(updateCanvas);
}

