const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('linkerApi', {
    startLinker: (config) => ipcRenderer.send('start-linker', config),
    stopLinker: () => ipcRenderer.send('stop-linker')
})
