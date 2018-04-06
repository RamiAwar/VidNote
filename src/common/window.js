const {BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

// BrowserWindow instance
exports.window

exports.create_window = function(w, h, mw, mh, mxw, mxh, file_path){


	//TODO: Handle empty parameters passed to function in javascript

	this.window = new BrowserWindow({
		width:w,
		height: h,
		minWidth: mw,
		minHeight:mh,
		maxWidth:mxw,
		maxHeight: mxh
	})

	// Enable Devtools
	this.window.webContents.openDevTools();

	// Load main window content
	this.window.loadURL(url.format({
		pathname: path.join(__dirname, file_path),

		protocol: 'file:'
	}));

	// Handle windows close
	this.window.on('closed', ()=> {
		this.window = null;
	})

}



