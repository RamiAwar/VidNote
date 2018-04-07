/**
 * @class Annotation
 * @description Annotation object that holds the video time and annotation text of the respective annotation. Audio to be added later.
 */
class Annotation{

	/**
	 * Annotation constructor
	 * @param  {String} annotation_text Text of the annotation in the video.
	 * @param  {Float} video_time      Time of the annotation in the video.
	 * @return {void}                 
	 */
	constructor(annotation_text, annotation_time){
		this.annotation_text = annotation_text;
		this.annotation_time = annotation_time;
	}

}

