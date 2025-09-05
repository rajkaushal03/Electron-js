const { ipcMain } = require("electron");

let responseWinRef = null;

function setResponseWin(win) {
  responseWinRef = win;
}

ipcMain.on("hide-response-window", () => {
  if (responseWinRef) {
    responseWinRef.hide();
  }
});

module.exports = { setResponseWin };
