// Tray manager for Electron app
// Handles creation of tray icon and menu

const { Tray, Menu, nativeImage, app } = require("electron");
const path = require("node:path");

let tray = null;

function createTray(toggleWindows) {
  if (tray) return tray;
  const iconPath = path.join(__dirname, "../../frontend/public/vite.svg");
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Toggle Windows", click: toggleWindows },
    { label: "Quit", click: () => app.quit() },
  ]);
  tray.setToolTip("Kluely");
  tray.setContextMenu(contextMenu);
  tray.on("click", toggleWindows);
  return tray;
}

module.exports = { createTray };
