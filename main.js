const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 250
  })

  win.loadFile('templates/index.html')
}

app.whenReady().then(() => {
  createWindow()
})