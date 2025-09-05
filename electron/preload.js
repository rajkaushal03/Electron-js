window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exitApp: () => ipcRenderer.send("exit-app"),
  hideBothWindows: () => ipcRenderer.send("hide-both-windows"),
  toggleBothWindows: () => ipcRenderer.send("toggle-both-windows"),
});