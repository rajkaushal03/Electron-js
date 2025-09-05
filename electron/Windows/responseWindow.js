const { BrowserWindow, screen } = require("electron");
const path = require("node:path");

//  Second window (for responses, full screen as an example)

// Create the response window as an overlay: transparent, always-on-top, frameless, skip taskbar
function createResponseWindow() {
	const { width } = screen.getPrimaryDisplay().workAreaSize;
	const responseWin = new BrowserWindow({
		title: "kluely-responses", // Title of the response overlay window
		width: 500,
		height: 200,
		x: Math.round((width - 500) / 2),
		y: 70,
		transparent: true, // overlay style (see Electron docs)
		frame: false, // this will remove the file,edit frame from the application
		alwaysOnTop: true, // this will always put the application on top
		skipTaskbar: true, // this will remove appicon from taskbar
		resizable: false,
		fullscreen: false,
		backgroundColor: "#00000000", // fully transparent
		focusable: true, // allow window to receive focus and be interactive
		hasShadow: false,
		webPreferences: {
			preload: path.join(__dirname, "../preload.js"),
		},
			show: true, // start visible by default
		});
	// Store original size for bulletproof shifting
	responseWin._originalWidth = 500;
	responseWin._originalHeight = 200;
		// responseWin.setIgnoreMouseEvents(true); // Uncomment for click-through overlay
		responseWin.setContentProtection(true);
		responseWin.loadFile(path.join(__dirname, "../responses.html"));
		return responseWin;
}

module.exports = { createResponseWindow };
