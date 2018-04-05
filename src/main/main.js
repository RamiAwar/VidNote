// True for development specific actions
DEV = true;

// ----- Modules ----- 
const {app, ipcMain} = require('electron');
const main_window = require('./gui/main_window/main_window');
// const read_item = require('./read_item')

// Electron reload enabled for development use only
if(DEV){
  require('electron-reload')(__dirname,{
      electron: require(`${__dirname}/node_modules/electron`)
  });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', main_window.create_window);

// Listen for new item
// ipcMain.on('new_annotation', (e, item_URL) =>{

//   // Send ok upon fetching thumbnail and title
//   read_item( item_URL, (item) => {
//       e.sender.send('new_item_ready', item);
//   });

// });


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
  if (main_window === null) {
    main_window.create_window();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
