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
const _annotation_manager = require('./src/main/annotation_manager.js');


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
  _window.create_window(600,450,350,450,650,450, '../renderer/views/index.html');
});

// Listen for new annotation button
ipcMain.on('open_annotation', (e, seek_time) =>{
    _window.create_window(500, 500, 500, 500, 500, 500, '../renderer/views/annotation_creator.html');
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
