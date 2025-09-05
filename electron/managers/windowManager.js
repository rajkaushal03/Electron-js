// Hide only the response window if visible
function hideResponseWindow() {
  ensureWindows();
  if (responseWin && responseWin.isVisible()) {
    responseWin.hide();
  }
}
// Window manager for Electron app
// Handles creation and toggling of main and response windows

const { createWindows } = require("../constant.js");

let mainWin = null;
let responseWin = null;

function ensureWindows() {
  if (!mainWin || mainWin.isDestroyed()) mainWin = null;
  if (!responseWin || responseWin.isDestroyed()) responseWin = null;
  if (!mainWin || !responseWin) {
    const { win, responseWin: respWin } = createWindows();
    mainWin = win;
    responseWin = respWin;
  }
}

function toggleWindows() {
  ensureWindows();
  const shouldShow = !mainWin.isVisible() || !responseWin.isVisible();
  if (shouldShow) {
    if (typeof mainWin.showInactive === 'function') mainWin.showInactive(); else mainWin.show();
    if (typeof responseWin.showInactive === 'function') responseWin.showInactive(); else responseWin.show();
  } else {
    mainWin.hide();
    responseWin.hide();
  }
}

function getMainWin() {
  return mainWin;
}

function getResponseWin() {
  return responseWin;
}

module.exports = {
  ensureWindows,
  toggleWindows,
  getMainWin,
  getResponseWin,
  hideResponseWindow,
};
