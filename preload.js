const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getName: () => ipcRenderer.invoke('dialog:getName')
})