// Native
const { join } = require('path')
const { format } = require('url')
const fs = require('fs-extra');
// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

// fuzz
const fuzz = require('fuzzball')
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


ipcMain.on('get-aniList', (event, arg) => {
  event.returnValue = store.get('aniList') || []
});
ipcMain.on('start-download', (event, {anime, episode}) => {
  StartDownloading(episode.hash.magnet, event, anime)
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
  	let hash = chooseHash(await getHashes(arg.title, i+1), {title: arg.title, episode: i+1})
  	if(hash && !isDuplicate(hashes, hash)){
  		hashes.push({hash, episode: i+1})
  	}else{
  		break
  	}
  }

  if(!aniList.some(val => val.mal_id === arg.mal_id)){
  	aniList.push({ mal_id: arg.mal_id, title: arg.title, episodesNumber: arg.episodes, episodesHash: hashes, watchedEpisodes: 0 })
  	store.set('aniList', aniList);
  }
});
ipcMain.on('unset-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id)
  store.set('followedAni', followedAni);
});

ipcMain.on('get-downloadedEpi', async (event, arg) => {
  let aniList = store.get('aniList') || [];
  let torrent = {}
  for (let val of aniList) {
    for (let _val of val.episodesHash) {
	    if(_val.pathname && await fs.pathExists(_val.pathname)) {
		  	torrent[_val.hash.magnet] = {
		  		key: _val.hash.magnet,
		  		progress: 1
		  	}
  		}
	  }
  }
  event.returnValue = torrent
});
function isDuplicate(array, arg){
	return array.some(val => val.hash.magnet === arg.magnet)
}
async function getHashes(title, episode) {
	let hashes = await new Promise(resolve => {
		void (async ()=>{
			try {
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
			} catch(error) {
				console.log(error)
				resolve(getHashes(title, episode))
			}
		})()
	})
	return hashes.filter(val => (val.title && val.magnet))
}
function chooseHash(hashes, {title, episode}){
	// Keep it sample for now

	title += " " + episode 
	const options = {scorer: fuzz.token_set_ratio, returnObjects: true, full_process: true};
	const choices = hashes.map(val => val.title);

	let result = fuzz.extract(title, choices, options);

	const key = result.length > 1 ? ((result[0].key > result[1].key && result[0].score === result[1].score) ? result[1].key : result[0].key) : 0
	return hashes[key]
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

function StartDownloading(magnet, event, anime){
	console.log(magnet)
	var folder = anime.title
	var magnetURI = magnet
	const downloadPath = app.getPath('downloads')
	const pathname = downloadPath + (downloadPath.endsWith('/') ? '' : '/') + folder
	client.add(magnetURI, { path: pathname }, function (torrent) {
	  event.sender.send('torrent-progress', {
		  key: magnet,
		  bytes: 0,
		  downloaded: 0,
		  speed: 0,
		  progress: 0
		}
	  )
	  console.log('Client is downloading:', torrent.infoHash)
	  /*torrent.files.forEach(function (file) {
	  	file.getBuffer(async function (err, buffer) {
		  if (err) throw err
		  await fs.outputFile(downloadPath + (downloadPath.endsWith('/') ? '' : '/') + folder + '/' + file.path , buffer, 'binary')
		})
	  })*/
	  torrent.on('done', function () {
	    console.log('torrent download finished')
	    let aniList = store.get('aniList') || []
	    let episodesHash = aniList.filter(val => val.mal_id === anime.mal_id)[0].episodesHash
	    episodesHash = episodesHash.map(val => {
	    	if(val.hash.magnet === magnetURI){
	    		val.pathname = pathname + '/' + torrent.files[0].path
	    	}
	    	return val
	    })
	    aniList = aniList.map(val => {
	    	if(val.mal_id === anime.mal_id){
	    		val.episodesHash = episodesHash
	    	}
	    	return val
	    })
	    store.set('aniList', aniList);
	  })
	  torrent.on('error', function (err) {
	  	console.log(err)
	  })
	  torrent.on('download', function (bytes) {
	  	event.sender.send('torrent-progress', {
	  			key: magnet,
  		  		bytes,
  		  		downloaded: torrent.downloaded,
  		  		speed: torrent.downloadSpeed,
  		  		progress: torrent.progress
  		  	}
	  	)
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
      webSecurity: false,
      contextIsolation: false,
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
  mainWindow.setMenu(null)
  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event, message) => {
  event.sender.send('message', message)
})
