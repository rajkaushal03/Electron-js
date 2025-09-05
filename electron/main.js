
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron/main");
const { createWindows } = require("./constant.js");

// Register IPC handlers
require("./ipc/exit.js");


app.whenReady().then(() => {
  createWindows();

  // Register global shortcut Ctrl+\
  globalShortcut.register('Control+\\', () => {
    // Send IPC to toggle both windows
    ipcMain.emit('toggle-both-windows');
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindows();
    }
  });
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
