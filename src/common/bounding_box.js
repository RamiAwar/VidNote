/**
 * @class Annotation
 * @description Annotation object that holds the video time and annotation text of the respective annotation. Audio to be added later.
 * @author  Rami Awar
 * @license MIT License
 */
class BoundingBox{

	/**
	 * Annotation constructor
	 * @param {Number} startx Left-most point.
	 * @param  {Number} starty Top-most point.
	 * @param  {Number} endx      Right-most point.
	 * @param  {Number} endy      Bottom-most point.
	 * @return {void}                 
	 */
	constructor(startx, starty, endx, endy){
		this.x = startx;
		this.y = starty;
		this.width = endx-startx;
		this.height = endy-starty;
	}



}

