/**
 * @module main 
 * @description  Main server side script, loads video by interfacing with file system and manages window creation and event listeners attached to them.
 * @author Rami Awar
 * @copyright MIT License
 */

// True for development specific actions
/**
 * @var {Boolean} DEV Development-mode on : enables electron reload and logging messages.
 */
var DEV = true;

/**
 * Setup
 */

const {app, ipcMain, dialog} = require('electron');
const _window = require('./src/common/window.js');
const fs = require('fs');


/*
  Global variables to hold the annotation every time one is created, and this is to allow it to be passed 
  around the multiple modules before getting saved and this instance is erased.
*/

/**
 * Annotation time holds the latest created annotation time since it has to be passed from one window to another
 * @type {Number}
 */
var annotation_time = 0;


//TODO: read video file name and then concatenate it with .anot extension
var filename = "test.anot";




let main_window, annotation_window;

// Electron reload enabled for development use only
if(DEV){
  require('electron-reload')(__dirname,{
      electron: require(`${__dirname}/node_modules/electron`)
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', ()=>{
  
  greeter_window = _window.create_window(400,250,400,250,400,250, '../renderer/views/greeter.html');
  
});



// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})


/**
 * Event handling
 */


ipcMain.on('open_main_window', (e, namepath) =>{

    main_window = _window.create_window(1000, 1000, 500, 500, 1500, 1200, '../renderer/views/index.html');
    main_window.on('closed', ()=>{
      app.relaunch();
      app.quit();
    })
});


/**
 * Opens annotation creation window
 */
ipcMain.on('open_annotation_window', (e, seek_time) =>{
    annotation_window = _window.create_window(500, 300, 500, 300, 500, 500, '../renderer/views/annotation_creator.html');
    annotation_time = seek_time;

    // Catch close event of annotation window to allow new annotations to be opened from mainwindow
    annotation_window.on('close', function() { //   
        main_window.webContents.send('annotation_window_closed', 1);

    });
});

/**
 * Listen for annotation_time request
 */
ipcMain.on('annotation_time_request', (e, f) => {
  e.sender.send('annotation_time_response', annotation_time);
});


app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (_window === null) {
    _window.create_window(600,450,350,450,650,450, '../renderer/views/index.html');
  }
})

