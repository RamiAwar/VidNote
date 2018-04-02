const {BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

// BrowserWindow instance
exports.window

exports.create_window = () => {

	this.window = new BrowserWindow({
		width:500,
		height: 650,
		minWidth: 350,
		minHeight:310,
		maxWidth:650
	})

	// Enable Devtools
	this.window.webContents.openDevTools();

	// Load main window content
	this.window.loadURL(url.format({
		pathname: path.join(__dirname, 'gui/main_window/main_window.html'),
		protocol: 'file:'
	}));

	// Handle windows close
	this.window.on('closed', ()=> {
		this.window = null;
	})

}

