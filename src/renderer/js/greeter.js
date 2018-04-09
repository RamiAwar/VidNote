const {remote, ipcRenderer} = require('electron')
const {TweenMax} = require('gsap')

$ = require('jquery')


text_container = $('.text-container')[0];

TweenMax.to(text_container, 0, {x:40, y:0, rotation:0});

var name, path;

var video_chosen = false;

$('#input_file').change(function(){
	
	video_chosen = true;

	const{n, p} = $('#input_file')[0].files[0];
	name = n;
	path = p;

	TweenMax.to($('#next'), 1, {opacity:1, ease:Linear.easeNone});

	$('#next').css('cursor', 'pointer');

	TweenMax.to(text_container, 1, {x:0, y:0, rotation:0, ease:Power0.easeIn});


	// TweenMax.to(box, 2, {left:"700px", repeat:-1, yoyo:true, onRepeat:onRepeat, repeatDelay:0, ease:Linear.easeNone});

	// function onRepeat() {
	//   count++;
	//   box.innerHTML = count;
	//   TweenLite.set(box, {backgroundColor:"hsl(" + Math.random() * 255 + ", 90%, 60%)"});
	// }		

});

$('#next').click(function(){
	
	if(video_chosen){

		console.log(name, path)
		var current_window = remote.getCurrentWindow();
		ipcRenderer.send('open_main_window', path);
		current_window.hide();

	}
});
