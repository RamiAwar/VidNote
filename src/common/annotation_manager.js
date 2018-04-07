let fs = require('fs');

exports.annotation_list = [];

exports.load_annotations = function(filename){

	var parsed_array = [];

	fs.readFile(filename, 'utf8', function(err, contents) {
		
		if(err) throw err;

		var array = contents.split("\`");
		
		for(var i = 0; i < array.length - 1; i++){
			parsed_array.push(JSON.parse(array[i]));	
		}

		console.log(parsed_array);
		console.log(parsed_array.length);

	});	

	return parsed_array;
}

exports.render_annotation = (item)=>{

		$("#annotation-list").append(`<button type="button" class="list-group-item list-group-item-action active">
						${this.annotation_list[i].annotation_text}
          			</button>`);

}
    
