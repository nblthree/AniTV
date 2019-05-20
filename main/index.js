// Native
const { join } = require('path')
const { format } = require('url')
const fs = require('fs-extra');
// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

// Scraping------------------------------------
const puppeteer = require('puppeteer')
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
ipcMain.on('set-followedAni', async (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni.push(arg)
  store.set('followedAni', followedAni);

  // Episodes
  let aniList = store.get('aniList') || []

  const hashes = []
  for (var i = 0; i < arg.episodes; i++) {
  	let hash = chooseHash(await getHashes(arg.title, i+1), arg.title)
  	if(hash){
  		hashes.push({hash, episode: i+1})
  	}else{
  		break
  	}
  }

  if(!aniList.some(val => val.mal_id === arg.mal_id)){
  	aniList.push({ mal_id: arg.mal_id, title: arg.title, episodesNumber: arg.episodes, episodesHash: hashes, watchedEpisodes: 0 })
  	store.set('aniList', aniList);
  }

  /*if(hashes.length){
  	StartDownloading(hashes[0].magnet)
  }*/
});
ipcMain.on('unset-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id)
  store.set('followedAni', followedAni);
});

async function getHashes(title, episode) {
	let hashes = await new Promise(resolve => {
		void (async ()=>{
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			await page.goto(`https://nyaa.si/?f=0&c=1_2&q=${processTitle(title, episode)}&s=seeders&o=desc`)

			const result = await page.evaluate(() => {
			  const grabFromItem = (item, selector, attr) =>{
			  	const val = item.querySelector(selector)
			  	return val ? val[attr] : ''
			  }
			  const data = document.querySelectorAll("tr")
			  const items = [...data].map(item => (
			  	{
			  		title: grabFromItem(item, 'td:nth-of-type(2) a:not([class])', 'title'),
			  		magnet: grabFromItem(item, 'td:nth-of-type(3) a:nth-of-type(2)', 'href')
			  	}
			  ))
			  return items
			})
			await browser.close()
			resolve(result)
		})()
	})
	return hashes.filter(val => (val.title && val.magnet))
}
function chooseHash(hashes, title){
	// Keep it sample for now
	return hashes[0]
}
function processTitle(title, episode){
	var quality = 720
	title = title.replace(/season ?/i, 'S').replace(/part ?[0-9]/i, '').trim()
	title = fixedEncodeURI(title)
	title += '+' + episode + ' ' + 720
	return title
} 
function fixedEncodeURI(str) {
  return encodeURI(str).replace(/[!'()*]/g, escape).replace(/%20/g, '+');
}
function stringAnalyser(str) {
	str = str.replaceAll("[^0-9]+", " ").trim().split(" ");
}

function StartDownloading(magnet){
	console.log(magnet)
	var magnetURI = magnet
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
	  torrent.on('error', function (err) {
	  	console.log(err)
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
