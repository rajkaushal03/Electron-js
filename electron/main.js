
const { app, globalShortcut } = require("electron/main");
const { ensureWindows, toggleWindows, getMainWin, getResponseWin } = require("./managers/windowManager.js");
const { createTray } = require("./managers/tray/trayManager.js");
require("./ipc/exit.js");

// App ready event

app.whenReady().then(() => {
  ensureWindows();
  createTray(toggleWindows);

  // Register global shortcut Ctrl+\ to toggle both windows
  globalShortcut.register('Control+\\', toggleWindows);

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
  globalShortcut.unregisterAll();
});
