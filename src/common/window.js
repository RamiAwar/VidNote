const {BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

const annotation_window = require('./gui/annotation_window/annotation_window');

// BrowserWindow instance
exports.window

exports.create_window = (w, h, mw, mh, mxw, mxh) => {

	//TODO: Handle empty parameters passed to function in javascript

	this.window = new BrowserWindow({
		width:500,
		height: 300,
		minWidth: 350,
		minHeight:200,
		maxWidth:650,
		maxHeight: (mxh || 300)
	})

	// Enable Devtools
	this.window.webContents.openDevTools();

	// Load main window content
	this.window.loadURL(url.format({
		pathname: path.join(__dirname, '/annotation_window.html'),
		protocol: 'file:'
	}));

	// Handle windows close
	this.window.on('closed', ()=> {
		this.window = null;
	})

}



