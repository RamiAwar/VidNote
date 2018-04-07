/**
 * @module main 
 * @description Main server side script 
 * Manages annotation saving by interfacing with file system
 * Loads video by interfacing with file system
 */
//test
// True for development specific actions
DEV = true;

const {app, ipcMain} = require('electron');
const _window = require('./src/common/window.js');
const fs = require('fs');


/*
  Global variables to hold the annotation every time one is created, and this is to allow it to be passed 
  around the multiple modules before getting saved and this instance is erased.
 */
var annotation_time = 0;
var annotation_text = "";


//TODO: read video file name and then concatenate it with .anot extension
var filename = "test.anot";

let main_window, annotation_window;

// Electron reload enabled for development use only
// if(DEV){
//   require('electron-reload')(__dirname,{
//       electron: require(`${__dirname}/node_modules/electron`)
//   });
// }


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{

  //TODO: load annotations and initialize global annotation list
  
  main_window = _window.create_window(1000, 1000, 500, 500, 1500, 1200, '../renderer/views/index.html');

  //TODO: send annotations list to update index.html
  
  
});

// Listen for new annotation button
ipcMain.on('open_annotation_window', (e, seek_time) =>{
    annotation_window = _window.create_window(500, 500, 500, 500, 500, 500, '../renderer/views/annotation_creator.html');
    annotation_time = seek_time;
    console.log(annotation_time);
});

// Listen for annotation_time request
ipcMain.on('annotation_time_request', (e, f) => {
  e.sender.send('annotation_time_response', annotation_time);
});

ipcMain.on('annotation_save_request', (e, annotation)=>{

  // Save annotation in seperate file
  
  //TODO: load file, sort by timestamp, then insert 
   
  var concatenated_annotation = JSON.stringify(annotation) + "\`";
  fs.appendFile(filename, concatenated_annotation, function (err) {
    if (err) {
      main_window.webContents.send('annotation_save_response', false);
      throw err;
    }else{
      console.log("Success");
      main_window.webContents.send('annotation_save_response', true);
      annotation_window.webContents.send('annotation_save_response', true);
    }
    
  });

  // update annotation list on video
  // read file
  

});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (_window === null) {
    _window.create_window(600,450,350,450,650,450, '../renderer/views/index.html');
  }
})

