const { app, ipcMain } = require("electron");

ipcMain.on("exit-app", () => {
	app.quit();
});
