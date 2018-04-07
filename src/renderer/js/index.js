/**
 * Handles all annotation window related event management.
 * Specifically, this class must fetch all form fields and create
 * an annotation object to be sent to our annotation_manager on the server
 * side which then decides what to do with it.
 */
const {ipcRenderer} = require('electron');
$ = require('jquery');

// Read already available annotation file (if available)
const manager = require('../../common/annotation_manager.js');

manager.annotation_list = manager.load_annotations('test.anot');

console.log(manager.annotation_list);
console.log(manager.annotation_list.length);

if(manager.annotation_list.length){
	manager.annotation_list.forEach(manager.render_annotation);
	console.log("appending");
}

var can_submit = true;

$("#add-annotation-button").click(annotate);

/**
 * Called when new annotation is requested
 * @description Send event to main controller to open annotation window
 * 
 */
function annotate(){

	//TODO: check if there were any previous annotations at this point in time and allow user to concatenate new annotation with previous one. Design decision: accuracy? How close should the points be to be merged into one?
	
	// Send video annotation time into the annotation manager
	if(can_submit){
		let vid = document.querySelector('video');
		ipcRenderer.send('open_annotation_window', vid.currentTime);
	}

	// Prevent submission of new annotations until current one is saved or discarded
	can_submit = false;

}

// Listen for async message from renderer process
ipcRenderer.on('annotation_save_response', (event, arg) => {  
    
    // Allow submission of new annotations
    if(arg) {
    	can_submit = true;
    	manager.render_annotations();
    }

});