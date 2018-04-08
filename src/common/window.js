/**
 * @module window
 * @exports create_window
 * @description  Module for creating new browser windows and loading html files assigned to them.
 * @author Rami Awar
 * @copyright MIT License
 */

const {BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

/** BrowserWindow instance */
exports.window

/**
 * Creates a new browser window.
 * @param {Number} w Window starting width
 * @param {Number} h Window starting height
 * @param {Number} mw Window minimum width
 * @param {Number} mh Window minimum height
 * @param {Number} mxw Window maximum width
 * @param {Number} mxh Window maximum height
 */
exports.create_window = function(w, h, mw, mh, mxw, mxh, file_path){


	//TODO: Handle empty parameters passed to function in javascript

	this.window = new BrowserWindow({
		width:w,
		height: h,
		minWidth: mw,
		minHeight:mh,
		maxWidth:mxw,
		maxHeight: mxh,
		show: false
	})

	// Open Devtools
	//this.window.webContents.openDevTools();

	// Load main window content
	this.window.loadURL(url.format({
		pathname: path.join(__dirname, file_path),
		protocol: 'file:'
	}));

	// Handle windows close - clear memory
	this.window.on('closed', ()=> {
		this.window = null;
	})

	// Show window only after HTML and CSS and JS have finished loading
	this.window.once('ready-to-show', () => {
  		this.window.show();
	});

	return this.window;

}



