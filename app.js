import { app, BrowserWindow, ipcMain } from "electron";
import { format, fileURLToPath } from "url";
import { join, dirname } from "path";

import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

let linkerProcess;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  ipcMain.on('start-linker', () => {
    if (!linkerProcess) {
      console.log("Starting Linker . . .");
      linkerProcess = spawn("node", ["./lib/autoLinker.js"]);
      linkerProcess.stdout.on('data', (data) => {
        if (data) console.log(data.toString())
      })
    }
  });

  ipcMain.on('stop-linker', () => {
    if (linkerProcess) {
      linkerProcess.kill();
      linkerProcess = undefined;
      console.log("Linker Stopped");
    }
  });

  mainWindow.loadURL(
    format({
      pathname: join(__dirname, `/dist/auto-linker/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on('before-quit', () => {
  if (linkerProcess) {
    linkerProcess.kill();
  }
})
