
const { app } = require("electron/main");
const { ensureWindows, toggleWindows, getMainWin, getResponseWin, hideResponseWindow, shiftWindows } = require("./managers/windowManager.js");
const { createTray } = require("./managers/tray/trayManager.js");
require("./ipc/exit.js");

// App ready event


app.whenReady().then(() => {
  const { globalShortcut } = require("electron/main");
  ensureWindows();
  createTray(toggleWindows);

  // Register global shortcut Ctrl+\ to toggle both windows
  globalShortcut.register('Control+\\', toggleWindows);

  // Register global shortcut Ctrl+R to hide only the response window
  globalShortcut.register('Control+R', hideResponseWindow);

  // Register global shortcut Ctrl+LeftArrow to shift all windows left
  globalShortcut.register('Control+Left', () => shiftWindows('left'));

  // Register global shortcut Ctrl+RightArrow to shift all windows right
  globalShortcut.register('Control+Right', () => shiftWindows('right'));

  app.on("activate", () => {
    ensureWindows();
    const mainWin = getMainWin();
    const responseWin = getResponseWin();
    if (mainWin && !mainWin.isVisible()) mainWin.show();
    if (responseWin && !responseWin.isVisible()) responseWin.show();
  });
});

// Prevent app from quitting when all windows are closed (keep tray running)

app.on("window-all-closed", () => {
  // Do nothing
});

// Cleanup on quit

app.on('will-quit', () => {
  try {
    const { globalShortcut } = require("electron/main");
    if (globalShortcut && typeof globalShortcut.unregisterAll === 'function') {
      globalShortcut.unregisterAll();
    }
  } catch (e) {
    // ignore
  }
});
