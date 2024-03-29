/**
 * @module index 
 * @description Handles all annotation window related event management.  Specifically, this class must fetch all form fields and create an annotation object to be sent to our annotation_manager on the server side which then decides what to do with it.
 * @author Rami Awar
 * @copyright MIT License
 */

const {ipcRenderer, remote} = require('electron');
$ = require('jquery');
const player = require('./player.js');

/**
 * Read already available annotation file (if available) else initialize to empty array
 */
const manager = require('../../common/annotation_manager.js');

var canvas = document.getElementById("canvas");
var video = document.getElementById("video");

var video_name;
var video_path;


var window_size = remote.getCurrentWindow().getSize();

/**
 * Initialize canvas listeners to draw selection region
 */
player.initialize_canvas_video(window_size);



/**
 * Attaching click listener to button
 */
$("#add-annotation-button").click(open_annotation_window);
$('#finished-button').click(close_main_window);


/**
 * Called when new annotation is requested
 * @description Send event to main controller to open annotation window
 * @return {void}
 */
function open_annotation_window(){

	//TODO: check if there were any previous annotations at this point in time and allow user to concatenate new annotation with previous one. Design decision: accuracy? How close should the points be to be merged into one?
	

	// Send video annotation time into the annotation manager

	let imageURL = getImageURL(canvas);

	var obj = {
		time: video.currentTime,
		thumbnail: imageURL,
		path: manager.filename
	};

	ipcRenderer.send('open_annotation_window', obj);


	// Prevent submission of new annotations until current one is saved or discarded
	$("#add-annotation-button").prop('disabled', true);

}


ipcRenderer.on('video:path', (e, a)=>{
	
	// Destructuring object
	({video_name, video_path} = a);

	// Set video src to path and window title to video name
	$('#title')[0].innerHTML = "VidNote - " + video_name; 
	$('#video')[0].src = video_path;

	//pass annotation file name
	manager.filename = video_path + '.anot';
	manager.annotation_list = (manager.load_annotations(manager.filename)) || [];

	/**
	 * Append elements to visual annotation list if nonempty
	 */
	if(manager.annotation_list.length){
		$('#annotation-list').empty();
		manager.annotation_list.forEach(manager.render_annotation);
	}

})


// Listen for async message from renderer process
ipcRenderer.on('annotation_save_response', (event, arg) => {  
    console.log("Saved annot");
    // Allow submission of new annotations
    if(arg) {
    	console.log("HERE");
    	$("#add-annotation-button").prop('disabled', false);
    	manager.annotation_list = (manager.load_annotations(manager.filename)) || [];
    	manager.clear_annotation_list();
		manager.annotation_list.forEach(manager.render_annotation);
		
    }

});

ipcRenderer.on('annotation_window_closed', (e, f)=>{
	console.log('OK');
	$("#add-annotation-button").prop('disabled', false);
});

function getImageURL(video){

	canvas.getContext('2d').drawImage(video, 0, 0, 200, 200);
	return canvas.toDataURL();
}

function close_main_window(){
	var current_window = remote.getCurrentWindow();
   	current_window.close(); 
}

/* 
	List highlighting
*/
var $thumbs = $('#annotation-list').click(function(e) {
    e.preventDefault();
    //run removeClass on every element
    //if the elements are not static, you might want to rerun $('.thumbnail')
    //instead of the saved $thumbs
    $thumbs.removeClass('item-highlight');
    //add the class to the currently clicked element (this)
    $(this).addClass('item-highlight');
});


