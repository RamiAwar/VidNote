const {ipcRenderer} = require('electron');
let fs = require('fs');

exports.annotation_list = [];


var filename = 'test.anot';


//TODO: change loading and rendering annotations to event based asynchronous operations. currently synchronous and blocking for simplicity
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

//TODO: INVESTIGATE CALLBACK ??? WHAT IS THIS?? 

function save_annotation(annotation, filename){

	var concatenated_annotation = JSON.stringify(annotation) + "\`";

	fs.appendFile(filename, concatenated_annotation, function (err) {

		// if (err) {
		//   main_window.webContents.send('annotation_save_response', false);
		//   throw err;
		// }else{
		//   console.log("Success");
		//   main_window.webContents.send('annotation_save_response', true);
		//   annotation_window.webContents.send('annotation_save_response', true);
		// }
	});
}
