const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('linkerApi', {
    startLinker: () => ipcRenderer.send('start-linker'),
    stopLinker: () => ipcRenderer.send('stop-linker')
})
