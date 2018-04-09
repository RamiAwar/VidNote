/**
 * @module annotation_handler
 * @author Rami Awar
 * @description Handles all annotation window related event management. Specifically, this class must fetch all form fields and create an annotation object to be sent to our annotation_manager on the server side which then decides what to do with it. 
 * @copyright MIT License
 */

const {remote, ipcRenderer} = require('electron');
$ = require('jquery');
let fs = require('fs');
var filename = 'test.anot';

/**
 * This allows current window access and window management (client side)
 */


let annotation_time = -1.1;
let annotation_text = "";

let not_sent = true;

// Request annotation_time 
ipcRenderer.send('annotation_time_request', 1);

// Receive annotation_time 
ipcRenderer.on('annotation_time_response', (event, seek_time)=>{
	annotation_time = seek_time;
});

/**
 * @function add_annotation 
 * @description  Fetches inputted information from annotation creation window and bundles them into an annotation object then saves it and renders the newly added annotation to the screen.
 */
function add_annotation(){

	annotation_title = $('#annotation-title').val();
	annotation_text = $('#annotation-text').val();
	console.log(annotation_text);

	// Make sure user has entered an annotation to save
	if(annotation_text !== "" && annotation_time != -1.1 && not_sent){
		
		// Issue event request to save the annotation server side
		let a = new Annotation(annotation_title, annotation_text, annotation_time);

		save_annotation(a, filename);

		//TODO: Disable button input
		not_sent = false;
		disable_inputs();

	}
}

/**
 * Disable all inputs while waiting for result of saving annotation.
 * 
 */
function disable_inputs(){
	$('#annotation-title').prop('disabled', true);
	$('#annotation-text').prop('disabled', true);
	$('#add-annotation').prop('disabled', true);
}

/**
 * Close window if annotation was saved successfully.
 */
function handle_success(){
	//TODO: display success message to user
	// Close window
	console.log("Closing window");
	var current_window = remote.getCurrentWindow();
   	current_window.close(); 
	
}

/**
 * Display error message and allow another attempt at saving annotation upon failure to save.
 */
function handle_failure(){
	
	//TODO: Feedback to user: some error occured
	not_sent = true;
	$('#annotation-text').prop('disabled', false);
	$('#add-annotation').prop('disabled', false);
	$('#annotation-title').prop('disabled', false);


}

/**
 * Append currently added annotation to the corresponding .anot file
 * @param  {Annotation} annotation Annotation object
 * @param  {String} filename   .anot file name
 */
function save_annotation(annotation, filename){
	var concatenated_annotation = JSON.stringify(annotation) + "\`";
	fs.appendFile(filename, concatenated_annotation, function (err) {
	if (err) {
	  handle_failure();
	  throw err;
	}else{
	  console.log("Success");
	  handle_success();
	  ipcRenderer.send('annotation_save_response', annotation);
	}

	});
}
