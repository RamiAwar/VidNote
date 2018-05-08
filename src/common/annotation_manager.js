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
const moment = require('moment');

exports.annotation_list = [];


exports.filename = '';



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

	console.log(parsed_array[0])

	return parsed_array;

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
	  ipcRenderer.send('annotation_save_response', annotation);
	  handle_success();
	}

	});
}



/**
 * Renders a given annotation object to the annotation list in index.html
 * @param  {Annotation} item Annotation to render
 * @return {void}
 */
exports.render_annotation = (item)=>{

		var m = moment().hours(0).minutes(0).seconds(0).add(item.annotation_time, 'seconds');
		console.log(m);
		console.log(item.annotation_time)
		var time_string = m.format("HH:mm:ss");
		console.log(time_string)

		$("#annotation-list").append(
		
		`
		<li class="list-group-item" style="cursor:pointer;" onclick="document.querySelector('video').currentTime = ${item.annotation_time};">
		    <img class="img-circle media-object pull-left" style="cursor:pointer;" src="${item.thumbnail}" width="32" height="32">
		    <div style="cursor:pointer;" class="media-body">
		      <strong style="cursor:pointer;">${item.annotation_title}</strong><small style="cursor:pointer;" class="pull-right">${time_string}</small>
		      <p style="cursor:pointer;">${item.annotation_text}</p>
		    </div>
		  </li>
        `);
}

