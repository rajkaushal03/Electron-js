const {  BrowserWindow } = require("electron/main");
const { screen } = require("electron");
const path = require("node:path");



function createWindows() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // 🔹 First window (your original one)
  win = new BrowserWindow({
    title: "kluely",
    width: 300,
    height: 20,
    x: Math.round((width - 300) / 2), // center horizontally
    y: 20, // stick to the top
    transparent: false, //this will make the application transparent 
    frame: false, //this will remove the file,edit fframe from the application
    alwaysOnTop: true, //this will always put the application on top
    skipTaskbar: true, //this will remove appicon from taskbar
    resizable: false, //this will not allow user to resize the applicationWorld!
    fullscreen: false, //this will restrict user to go fullscreen
    backgroundColor: "rgba(0, 0, 0, 0.3)",  
    // opacity: 0.5,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  
  win.setContentProtection(true); // Prevents screen capturing
  // win.webContents.openDevTools(); // Open DevTools for debugging
  // win.loadFile(path.join(__dirname, "../index.html"));
  win.loadURL("http://localhost:3000"); // Load your React app through local host works with development


//   🔹 Second window (for responses, full screen as an example)
  responseWin = new BrowserWindow({
    title: "kluely-responses",
    width:500, // full width
    height:200, // full height
    x: Math.round((width - 500) / 2), // start from left edge
    y: 60, // start from top edge
    transparent: false, //this will make the application transparent 
    frame: false, //this will remove the file,edit fframe from the application
    alwaysOnTop: true, //this will always put the application on top
    skipTaskbar: true, //this will remove appicon from taskbar
    resizable: false, //this will not allow user to resize the applicationWorld!
    fullscreen: false, //this will restrict user to go fullscreen
    backgroundColor: "rgba(0, 0, 0, 0.3)",  
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  responseWin.setContentProtection(true);
  responseWin.loadFile(path.join(__dirname, "responses.html"));
}


module.exports = { createWindows };