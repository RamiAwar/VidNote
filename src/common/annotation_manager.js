/**
 * @module annotation_manager
 * @exports load_annotations
 * @exports render_annotation
 * @description  Module for creating new browser windows and loading html files assigned to them.
 * @author Rami Awar
 * @copyright MIT License
 */

const {ipcRenderer} = require('electron');
let fs = require('fs');

exports.annotation_list = [];


var filename = 'test.anot';



//TODO: change loading and rendering annotations to event based asynchronous operations. currently synchronous and blocking for simplicity

/**
 * Loads annotations from a give .anot
 * @param  {String} filename .anot file name
 * @return {Array<Annotation>} An arrray of annotations parsed from the input
 */
exports.load_annotations = function(filename){

	var parsed_array = [];
	var contents = "";
	try{
		contents = fs.readFileSync(filename, 'utf8');
	}catch(err){
		//no file found
	}
	var array = contents.split("\`");
		
	for(var i = 0; i < array.length - 1; i++){
		parsed_array.push(JSON.parse(array[i]));	
	}

	return parsed_array;

}

/**
 * Renders a given annotation object to the annotation list in index.html
 * @param  {Annotation} item Annotation to render
 * @return {void}
 */
exports.render_annotation = (item)=>{

		$("#annotation-list").append(
			`
          	<a href="#" class="list-group-item list-group-item-action flex-column align-items-start active" onclick="document.querySelector('video').currentTime = ${item.annotation_time};">
			    <div class="d-flex w-100 justify-content-between" >
			      <h5 class="mb-1">${item.annotation_title}</h5>
			      <small>${item.annotation_time}</small>
			    </div>
			    <p class="mb-1">${item.annotation_text}</p>
			</a>	
          	`);
}




/**
 * annotation_save_request Listener
 */
ipcRenderer.on('annotation_save_request', (e, annotation)=>{

  // Save annotation in seperate file
  save_annotation(annotation, filename);
  
  // update annotation list on video
  //TODO: empty annotation list in html
  //TODO: insert annotation in the list while sorting
  //TODO: display annotation list in html
  //TODO: create smart insertion method to insert to html without recreating everything
  render_annotation(annotation);

});

/**
 * Saves a given annotation to the given filename. If other annotations in the filename are already present, the annotation is simply appended. Sorting on every load is acknowledged, but for simplicity this model is enough. Another storage model might be more fitting in case the uses of this application evolve into something more complex.
 * @param  {Annotation} annotation
 * @param  {String} filename  
 * @return {void}       
 */
function save_annotation(annotation, filename){

	var concatenated_annotation = JSON.stringify(annotation) + "\`";

	fs.appendFile(filename, concatenated_annotation, function (err) {

		if(err){
			//TODO: display error on failure of writing new annotation to file
		}else{
			//TODO: display success toast
		}

	});
}
