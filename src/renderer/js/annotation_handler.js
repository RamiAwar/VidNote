/**
 * Handles all annotation window related event management.
 * Specifically, this class must fetch all form fields and create
 * an annotation object to be sent to our annotation_manager on the server
 * side which then decides what to do with it.
 */

const {ipcRenderer} = require('electron');

function annotate(){
	
	//TODO: Send event to main to open annotation window
	ipcRenderer.send('open_annotation', 15);
 
}