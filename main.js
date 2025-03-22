const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs')

// Handler to communicate with the render process and share the user's saved name, or null otherwise
async function handleGetName () {

    let dataPath = app.getPath("userData");
    dataPath = path.join(dataPath, 'data.js');

    if (fs.existsSync(dataPath)) {
        let dt = fs.readFileSync(dataPath);
        let data = JSON.parse(dt);
        return data.name;
    }

    return null;

    
}

// Creates each window instance and loads up the html
function createWindow() {
    const win = new BrowserWindow({
        width: 300,
        height: 250,
        webPreferences: {
            preload:  path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('templates/index.html')
    win.openDevTools();
}

app.whenReady().then(() => {
    
    ipcMain.handle('dialog:getName', handleGetName)
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })

  })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  