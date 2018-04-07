/**
 * @module annotation_handler
 * @description Handles all annotation window related event management.
 * Specifically, this class must fetch all form fields and create
 * an annotation object to be sent to our annotation_manager on the server
 * side which then decides what to do with it.
 */

const {ipcRenderer} = require('electron');
$ = require('jquery');

/**
 * This allows current window access and window management (client side)
 */
const remote = require('electron').remote;


let annotation_time = -1.1;
let annotation_text = "";

let not_sent = true;

// Request annotation_time 
ipcRenderer.send('annotation_time_request', 1);

// Receive annotation_time 
ipcRenderer.on('annotation_time_response', (event, seek_time)=>{
	annotation_time = seek_time;
});

function add_annotation(){

	annotation_text = $('#annotation-text').val();
	console.log(annotation_text);

	// Make sure user has entered an annotation to save
	if(annotation_text !== "" && annotation_time != -1.1 && not_sent){
		
		// Issue event request to save the annotation server side
		let a = new Annotation(annotation_text, annotation_time);

		ipcRenderer.send('annotation_save_request', a);

		//TODO: Disable button input
		not_sent = false;
		$('#annotation-text').prop('disabled', true);
		$('#add-annotation').prop('disabled', true);

	}
}

ipcRenderer.on('annotation_save_response', (event, result)=>{
	
	if(result == false){
		//TODO: Feedback to user: some error occured
		
		not_sent = true;
		$('#annotation-text').prop('disabled', false);
		$('#add-annotation').prop('disabled', false);

	}else{
		// Close window
		console.log("Closing window");
		var current_window = remote.getCurrentWindow();
       	current_window.close(); 
		
	}
});