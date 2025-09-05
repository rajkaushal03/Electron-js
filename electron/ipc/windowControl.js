
const { ipcMain } = require("electron");
const { isWindowVisible } = require("../utils/function.js");

let mainWinRef = null;
let responseWinRef = null;

function setMainWin(win) {
  mainWinRef = win;
}

function setResponseWin(win) {
  responseWinRef = win;
}



ipcMain.on("hide-both-windows", () => {
  if (mainWinRef) mainWinRef.hide();
  if (responseWinRef) responseWinRef.hide();
});

ipcMain.on("toggle-both-windows", () => {
  // If both are visible, hide both. If both are hidden, show both. If mixed, show both.
  const shouldShow = !isWindowVisible(mainWinRef) || !isWindowVisible(responseWinRef);
  if (mainWinRef && responseWinRef) {
    if (shouldShow) {
      if (typeof mainWinRef.showInactive === 'function') {
        mainWinRef.showInactive();
      } else {
        mainWinRef.show();
      }
      if (typeof responseWinRef.showInactive === 'function') {
        responseWinRef.showInactive();
      } else {
        responseWinRef.show();
      }
    } else {
      mainWinRef.hide();
      responseWinRef.hide();
    }
  }
});

module.exports = { setMainWin, setResponseWin };
