import { app, BrowserWindow, ipcMain } from "electron";
import { format, fileURLToPath } from "url";
import { join, dirname } from "path";

import { startLinker, cleanExit } from "./lib/autoLinker.js";

// Change cwd to this lib dir
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  ipcMain.on('start-linker', () => {
    console.log("\nStarting Linker . . .\n");
    startLinker();
  });

  ipcMain.on('stop-linker', () => {
    cleanExit();
    console.log("\nLinker Stopped\n");
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

app.on('quit', () => {
  cleanExit();
})
