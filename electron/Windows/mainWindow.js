const { BrowserWindow, screen } = require("electron");
const path = require("node:path");

//  First window (your original one)

// Create the main window as an overlay: transparent, always-on-top, frameless, skip taskbar
function createMainWindow() {
	const { width } = screen.getPrimaryDisplay().workAreaSize;
	const win = new BrowserWindow({
		title: "kluely", // Title of the main overlay window
		width: 250,
		height: 35,
		x: Math.round((width - 300) / 2), // center horizontally
		y: 20, // stick to the top
		transparent: false, // overlay style (see Electron docs)
		frame: false, // this will remove the file,edit frame from the application
		alwaysOnTop: true, // this will always put the application on top
		skipTaskbar: true, // this will remove appicon from taskbar
		resizable: false,
		fullscreen: false,
		backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent
		focusable: false, // allow window to receive focus and be interactive
		hasShadow: false,
		webPreferences: {
			preload: path.join(__dirname, "../preload.js"),
		},
			show: true, // start visible by default
		});
		// win.setIgnoreMouseEvents(true); // Uncomment for click-through overlay
		// win.webContents.openDevTools(); // Open DevTools for debugging
		// win.loadFile(path.join(__dirname, "../index.html"));
		win.setContentProtection(true); // Prevents screen capturing
		win.loadURL("http://localhost:3000"); // Load your React app through localhost (works with development)
		return win;
}

module.exports = { createMainWindow };
