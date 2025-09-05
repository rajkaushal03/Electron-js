
const { createMainWindow } = require("./Windows/mainWindow.js");
const { createResponseWindow } = require("./Windows/responseWindow.js");
const { setMainWin, setResponseWin } = require("./ipc/windowControl.js");


function createWindows() {
  const win = createMainWindow();
  const responseWin = createResponseWindow();
  setMainWin(win);
  setResponseWin(responseWin);
  return { win, responseWin };
}

module.exports = { createWindows };