// Native
const { join } = require('path')
const { format } = require('url')
const fs = require('fs-extra');
// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

// torrent-------------------------------------
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
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

  // Episodes
  let aniList = store.get('aniList') || []
  if(!aniList.some(val => val.mal_id === arg.mal_id)){
  	aniList.push({ mal_id: arg.mal_id, title: arg.title, episodesNumber: arg.episodes, episodesHash: [], watchedEpisodes: 0 })
  	store.set('aniList', aniList);
  }
  const hashes = getHashes()
  //StartDownloading(aniList)
});
ipcMain.on('unset-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id)
  store.set('followedAni', followedAni);
});

function getHashes() {
	
}
function StartDownloading(aniList){
	var magnetURI = '7884464d57cc787705d9c95de7d9386db0c30728'
	const downloadPath = app.getPath('downloads')
	client.add(magnetURI, function (torrent) {
	  // Got torrent metadata!
	  console.log('Client is downloading:', torrent.infoHash)

	  torrent.files.forEach(function (file) {
	  	file.getBuffer(async function (err, buffer) {
		  if (err) throw err
		  await fs.outputFile(downloadPath + (downloadPath.endsWith('/') ? '' : '/') + file.path , buffer, 'binary')
		})
	  })
	})
}

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
