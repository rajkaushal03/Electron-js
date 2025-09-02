const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 300, 
    transparent:false, //this will make the application transparent 
    frame:false, //this will remove the file,edit fframe from the application
    alwaysOnTop:false,//this will always put the application on top
    skipTaskbar:true,//this will remove appicon from taskbar
    resizable:false, //this will not allow user to resize the application
    fullscreen:false, //this will restrict user to go fullscreen
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
