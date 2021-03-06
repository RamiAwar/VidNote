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

const electron = require('electron')
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
var thumbnail;


//TODO: read video file name and then concatenate it with .anot extension
var filename;
var video_path;
var video_name;

// FFprobe needed to get video dimensions and design main window to fit the video
var ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');

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


ipcMain.on('open_main_window', (e, a) =>{

    video_name = a.name;
    video_path = a.path;

    var escreen = electron.screen;
    var screen = escreen.getPrimaryDisplay();

    var vid_width = 0;
    var vid_height = 0;

    ffprobe(video_path, { path: ffprobeStatic.path }, function (err, info) {
      
      if (err) return done(err);
      
      //console.log(info.streams[0].width ,',', screen.size.width);
      
      vid_width = parseInt(info.streams[0].width);
      vid_height = parseInt(info.streams[0].height);
      var aspect_ratio = vid_width/vid_height;
      console.log('here', vid_height);

      // var width = Math.min(parseInt(screen.size.width/3), parseInt(vid_width) + 255);

      // var height = Math.min(parseInt(vid_height), parseInt(screen.size.height) - 300);
      // var width = parseInt(height*aspect_ratio + 255);
      // console.log(height);  

      var aspect_ratio = (vid_width/vid_height).toPrecision(3);
      width = vid_width + 255;
      height = width/aspect_ratio;
      if(height > screen.size.height - 300){
        height = screen.size.height - 300;
        width = parseInt(height*aspect_ratio) + 110 ;
      }


      main_window = _window.create_window(width, height, width, height, width, height, '../renderer/views/index.html');
      main_window.on('closed', ()=>{
        greeter_window.reload();
        greeter_window.show();
      });
      main_window.once('ready-to-show', function(){
        var a = {video_name:video_name, video_path:video_path};
        main_window.webContents.send('video:path', a);
      });
    
    });



    

});


/**
 * Opens annotation creation window
 */
ipcMain.on('open_annotation_window', (e, obj) =>{

    annotation_window = _window.create_window(500, 250, 500, 300, 500, 500, '../renderer/views/annotation_creator.html');
    annotation_time = obj.time;
    thumbnail = obj.thumbnail;

    // Catch close event of annotation window to allow new annotations to be opened from mainwindow
    annotation_window.on('close', function() { //   
        main_window.webContents.send('annotation_window_closed', 1);
    });
});

/**
 * Listen for annotation_time request
 */


ipcMain.on('annotation_time_request', (e, f) => {
  
  var obj = {
    time:annotation_time, 
    thumbnail:thumbnail,
    path:video_path
  };

  e.sender.send('annotation_time_response', obj);
});

ipcMain.on('annotation_save_response', (e, f) =>{
  main_window.webContents.send('annotation_save_response', f);
})


app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (_window === null) {
    _window.create_window(600,450,350,450,650,450, '../renderer/views/index.html');
  }
})

