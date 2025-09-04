const { app, BrowserWindow } = require("electron/main");
const { createWindows } = require("./constant.js");

let win;
let responseWin;


app.whenReady().then(() => {
  createWindows();

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

