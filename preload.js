const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('linkerApi', {
    test: (msg) => ipcRenderer.send('test', msg)
})
