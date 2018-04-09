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
		<li class="list-group-item" style="cursor:pointer;" onclick="document.querySelector('video').currentTime = ${item.annotation_time};">
		    <img class="img-circle media-object pull-left" style="cursor:pointer;" src="${item.thumbnail}" width="32" height="32">
		    <div style="cursor:pointer;" class="media-body">
		      <strong style="cursor:pointer;">${item.annotation_title}</strong><small style="cursor:pointer;" class="pull-right">${item.annotation_time}</small>
		      <p style="cursor:pointer;">${item.annotation_text}</p>
		    </div>
		  </li>
        `);
}

