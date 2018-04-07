/**
 * Handles all annotation window related event management.
 * Specifically, this class must fetch all form fields and create
 * an annotation object to be sent to our annotation_manager on the server
 * side which then decides what to do with it.
 */

const {ipcRenderer} = require('electron');

/**
 * Called when new annotation is requested
 * @description Send event to main controller to open annotation window
 * 
 */
function annotate(){
	
	
	// Fetch input text
	let annotation_text = $('#annotation-text').val();
	let vid = $('#main-video')
	let a = new Annotation(annotation_text, )

	ipcRenderer.send('open_annotation', a);
 
}