// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const { BrowserWindow, app, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

const fs = require('fs-extra')
const fuzz = require('fuzzball')
const puppeteer = require('puppeteer')
const WebTorrent = require('webtorrent')
const Store = require('electron-store')

const isProd = process.env.NODE_ENV === 'production'
if (!isProd) {
  const userDataPath = app.getPath('userData')
  app.setPath('userData', `${userDataPath} (development)`)
}

const client = new WebTorrent()
const store = new Store({ name: 'appData' })

ipcMain.on('get-season', (event, arg) => {
  event.returnValue = store.get('season') || []
})
ipcMain.on('set-season', (event, arg) => {
  store.set('season', arg)
})

ipcMain.on('get-aniList', (event, arg) => {
  event.returnValue = store.get('aniList') || []
})
ipcMain.on('start-download', (event, { anime, episode }) => {
  startDownloading(episode.magnet, event, anime)
})

ipcMain.on('get-followedAni', (event, arg) => {
  event.returnValue = store.get('followedAni') || []
})
ipcMain.on('set-followedAni', async (event, arg) => {
  const followedAni = store.get('followedAni') || []
  followedAni.push(arg)
  store.set('followedAni', followedAni)

  // Episodes
  const aniList = store.get('aniList') || []

  const { newTitle, newHashes } = await getAnimeEpisodes(arg)
  arg.title = newTitle
  const hashes = newHashes

  if (!aniList.some(val => val.mal_id === arg.mal_id)) {
    aniList.push({
      mal_id: arg.mal_id,
      title: arg.title,
      episodesNumber: arg.episodes,
      episodes: hashes,
      watchedEpisodes: 0
    })
    store.set('aniList', aniList)
  }
})

ipcMain.on('reload-episodes', async (event, arg) => {
  let aniList = store.get('aniList') || []
  aniList = aniList.filter(val => val.mal_id !== arg.mal_id)
  const results = await getHorribleSubs(arg.title)
  aniList.push({
    mal_id: arg.mal_id,
    title: arg.title,
    episodesNumber: arg.episodes,
    episodes: results,
    watchedEpisodes: 0
  })
  store.set('aniList', aniList)
})

ipcMain.on('unset-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || []
  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id)
  store.set('followedAni', followedAni)
})

ipcMain.on('get-downloadedEpi', async (event, arg) => {
  const aniList = store.get('aniList') || []
  const torrent = {}
  for (const val of aniList) {
    for (const _val of val.episodes) {
      if (_val.pathname && (await fs.pathExists(_val.pathname))) {
        torrent[_val.magnet] = {
          key: _val.magnet,
          progress: 1
        }
      }
    }
  }

  event.returnValue = torrent
})
function isDuplicate(array, arg) {
  return array.some(val => val.magnet === arg.magnet)
}

function getAnimeEpisodes(anime) {
  return new Promise(async resolve => {
    const titleOperations = [
      { name: 'normal' },
      { name: 'drop-nd-rd-th' },
      { name: 'pure' }
    ]

    const newEpisodesNumber = anime.episodes
    const newHashes = []
    const loopLength = Array.apply(null, {
      length: 500
    }).map(Number.call, Number)
    let newTitle = anime.title
    for (const operation of titleOperations) {
      if (operation.name === 'pure') {
        newTitle = anime.title
        newTitle = newTitle
          .replace(/season|nd|part|rd|th|s?\d+/gi, '')
          .replace(/  +/g, ' ')
      } else if (operation.name === 'normal') {
        newTitle = anime.title
        newTitle = newTitle
          .replace(/season ?/i, 'S')
          .replace(/part ?\d/i, '')
          .replace(/\s+0+(?!\.|$)/g, ' ')
          .replace(/  +/g, ' ')
      } else if (operation.name === 'drop-nd-rd-th') {
        newTitle = anime.title
        const season = newTitle.match(/\d+/g)
        newTitle = newTitle.replace(/season|nd|part|rd|th|s?\d+/gi, '')
        newTitle += season ? ` S${  season[0]}` : ''
        newTitle = newTitle.replace(/  +/g, ' ')
      }

      newTitle = newTitle.trim()

      for (const i of loopLength) {
        const item = chooseHash(await getHashes(newTitle, i + 1), {
          title: newTitle,
          episode: i + 1
        })
        if (item && !isDuplicate(newHashes, item)) {
          newHashes.push({ ...item, number: i + 1 })
        } else {
          break
        }
      }

      if (newHashes.length !== 0) break
    }

    resolve({ newTitle, newHashes })
  })
}

function getHorribleSubs(title) {
  return new Promise(async resolve => {
    const newTitle =
      `[HorribleSubs] ${ 
      title
        .replace(/season|nd|part|rd|th|s?\d+/gi, '')
        .replace(/  +/g, ' ')
        .trim()}`
    let allMagnets = []
    for (let i = 1; i < 50; i++) {
      const result = await getHashes(newTitle, -1, i)
      if (result && result.length) {
        allMagnets.push(...result)
      } else {
        break
      }
    }

    allMagnets = allMagnets.map((val, index) => ({ ...val, number: index + 1 }))
    resolve(allMagnets.sort((a, b) => a.title.localeCompare(b.title)))
  })
}

async function getHashes(title, episode, p = 1) {
  const hashes = await new Promise(resolve => {
    void (async () => {
      try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(
          `https://nyaa.si/?f=0&c=1_2&q=${processTitle(
            title,
            episode
          )}&p=${p}&s=seeders&o=desc`
        )

        const result = await page.evaluate(() => {
          const grabFromItem = (item, selector, attr) => {
            const val = item.querySelector(selector)
            return val ? val[attr] : ''
          }

          const data = document.querySelectorAll('tr')
          const items = [...data].map(item => ({
            title: grabFromItem(
              item,
              'td:nth-of-type(2) a:not([class])',
              'title'
            ),
            magnet: grabFromItem(
              item,
              'td:nth-of-type(3) a:nth-of-type(2)',
              'href'
            )
          }))
          return items
        })
        await browser.close()
        resolve(result)
      } catch (error) {
        console.log(error)
        resolve(getHashes(title, episode))
      }
    })()
  })
  return hashes.filter(val => val.title && val.magnet)
}

function chooseHash(hashes, { title, episode }) {
  title += ` ${  episode}`
  const options = {
    scorer: fuzz.token_set_ratio,
    returnObjects: true,
    full_process: true
  }

  const choices = hashes.map(val => val.title.replace(/\s+0+(?!\.|$)/g, ' '))
  const result = fuzz.extract(title, choices, options)

  const key =
    result.length > 1
      ? result[0].key > result[1].key && result[0].score === result[1].score
        ? result[1].key
        : result[0].key
      : 0
  return hashes[key]
}

function processTitle(title, episode) {
  const quality = 720
  if (episode !== -1) {
    title += ` ${  episode  } ${  quality}`
  } else {
    title += ` ${  quality}`
  }

  title = fixedEncodeURI(title)
  return title
}

function fixedEncodeURI(str) {
  return encodeURI(str)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+')
}

function startDownloading(magnet, event, anime) {
  const folder = anime.title
  const magnetURI = magnet
  const downloadPath = app.getPath('downloads')
  const pathname =
    downloadPath + (downloadPath.endsWith('/') ? '' : '/') + folder
  client.add(magnetURI, { path: pathname }, function(torrent) {
    event.sender.send('torrent-progress', {
      key: magnet,
      bytes: 0,
      downloaded: 0,
      speed: 0,
      progress: 0
    })
    console.log('Client is downloading:', torrent.infoHash)

    torrent.on('done', function() {
      console.log('torrent download finished')
      let aniList = store.get('aniList') || []
      let { episodes } = aniList.filter(val => val.mal_id === anime.mal_id)[0]
      episodes = episodes.map(val => {
        if (val.magnet === magnetURI) {
          for (let i = 0; i < torrent.files.length; i++) {
            val.pathnames[i] = `${pathname  }/${  torrent.files[i].path}`
          }
        }

        return val
      })
      aniList = aniList.map(val => {
        if (val.mal_id === anime.mal_id) {
          val.episodes = episodes
        }

        return val
      })
      store.set('aniList', aniList)
    })
    torrent.on('error', function(err) {
      console.log(err)
    })
    torrent.on('download', function(bytes) {
      event.sender.send('torrent-progress', {
        key: magnet,
        bytes,
        downloaded: torrent.downloaded,
        speed: torrent.downloadSpeed,
        progress: torrent.progress
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
