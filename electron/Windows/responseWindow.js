const { BrowserWindow, screen } = require("electron");
const path = require("node:path");

//  Second window (for responses, full screen as an example)
function createResponseWindow() {
	const { width } = screen.getPrimaryDisplay().workAreaSize;
	const responseWin = new BrowserWindow({
		title: "kluely-responses",
		width: 500, // full width
		height: 200, // full height
		x: Math.round((width - 500) / 2), // start from left edge
		y: 60, // start from top edge
		transparent: false, // this will make the application transparent
		frame: false, // this will remove the file,edit frame from the application
		alwaysOnTop: true, // this will always put the application on top
		skipTaskbar: true, // this will remove appicon from taskbar
		resizable: false, // this will not allow user to resize the application
		fullscreen: false, // this will restrict user to go fullscreen
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		webPreferences: {
			preload: path.join(__dirname, "../preload.js"),
		},
	});
	responseWin.setContentProtection(true);
	responseWin.loadFile(path.join(__dirname, "../responses.html"));
	return responseWin;
}

module.exports = { createResponseWindow };
