const { BrowserWindow, screen } = require("electron");
const path = require("node:path");

//  First window (your original one)
function createMainWindow() {
	const { width } = screen.getPrimaryDisplay().workAreaSize;
	const win = new BrowserWindow({
		title: "kluely",
		width: 300,
		height: 20,
		x: Math.round((width - 300) / 2), // center horizontally
		y: 20, // stick to the top
		transparent: false, // this will make the application transparent
		frame: false, // this will remove the file,edit frame from the application
		alwaysOnTop: true, // this will always put the application on top
		skipTaskbar: true, // this will remove appicon from taskbar
		resizable: false, // this will not allow user to resize the application
		fullscreen: false, // this will restrict user to go fullscreen
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		// opacity: 0.5,
		webPreferences: {
			preload: path.join(__dirname, "../preload.js"),
		},
	});

	// win.webContents.openDevTools(); // Open DevTools for debugging
	// win.loadFile(path.join(__dirname, "../index.html"));

	win.setContentProtection(true); // Prevents screen capturing
	win.loadURL("http://localhost:3000"); // Load your React app through localhost (works with development)
	return win;
}

module.exports = { createMainWindow };
