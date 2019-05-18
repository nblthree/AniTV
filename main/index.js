// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

// Store---------------------------------------
const Store = require('electron-store');
const isProd = process.env.NODE_ENV === 'production';
const store = new Store({ name: 'This-Season' });
if (!isProd) {

  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (development)`);
}


// Events--------------------------------------
ipcMain.on('get-season', (event, arg) => {
  event.returnValue = store.get('season') || [];
});
ipcMain.on('set-season', (event, arg) => {
  store.set('season', arg);
});

ipcMain.on('get-followedAni', (event, arg) => {
  event.returnValue = store.get('followedAni') || [];
});
ipcMain.on('set-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni.push(arg)
  store.set('followedAni', followedAni);
});
ipcMain.on('unset-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id)
  store.set('followedAni', followedAni);
});




// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, 'preload.js')
    }
  })
  mainWindow.webContents.openDevTools()

  const url = isDev
    ? 'http://localhost:8000/start'
    : format({
      pathname: join(__dirname, '../renderer/start/index.html'),
      protocol: 'file:',
      slashes: true
    })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event, message) => {
  event.sender.send('message', message)
})
