// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');

const fs = require('fs-extra');
const Store = require('electron-store');

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (development)`);
}

const store = new Store({ name: 'appData' });

// Const isWin = process.platform === 'win32';

const {
  getHorribleSubs,
  getAnimeEpisodes,
  startDownloading
} = require('./functions');

// Events Listening..........
// get-set the animes of the current season
ipcMain.on('get-season', event => {
  event.returnValue = store.get('season') || [];
});
ipcMain.on('set-season', (event, arg) => {
  store.set('season', arg);
});
// Get the followed animes with additional data like episodes torrent Magnet URI
ipcMain.on('get-aniList', event => {
  event.returnValue = store.get('aniList') || [];
});
// Trigger download (triggered by a click on a button)
ipcMain.on('start-download', (event, { anime, episode }) => {
  startDownloading(episode.magnet, event, anime, {
    store,
    downloadPath: app.getPath('downloads')
  });
});
// Get the followed animes
ipcMain.on('get-followedAni', event => {
  event.returnValue = store.get('followedAni') || [];
});
// Set the followed animes and update aniList
ipcMain.on('set-followedAni', async (event, arg) => {
  const followedAni = store.get('followedAni') || [];
  followedAni.push(arg);
  store.set('followedAni', followedAni);

  // Episodes
  const aniList = store.get('aniList') || [];

  let newTitle;
  let newHashes;
  try {
    const result = await getAnimeEpisodes(arg);
    newTitle = result.newTitle;
    newHashes = result.newHashes;
  } catch (error) {
    console.error(error);
  }

  arg.title = newTitle;
  const hashes = newHashes;

  if (!aniList.some(val => val.mal_id === arg.mal_id)) {
    aniList.push({
      mal_id: arg.mal_id,
      title: arg.title,
      episodesNumber: arg.episodes,
      episodes: hashes,
      watchedEpisodes: [],
      lastUpdate: Date.now()
    });
    store.set('aniList', aniList);
  }

  event.sender.send('onload', false);
});
// Check for new episodes each 15 minutes
setInterval(async () => {
  const followedAni = store.get('followedAni') || [];
  let aniList = store.get('aniList') || [];
  if (followedAni.length === 0) return;
  for (let i = 0; i < followedAni.length; i++) {
    const val = aniList.filter(ele => ele.mal_id === followedAni[i].mal_id)[0];
    if (!val) return;
    let newHashes = [];
    try {
      const result = await getAnimeEpisodes(val, val.episodes.length + 1);
      newHashes = result.newHashes;
    } catch (error) {
      console.error(error);
    }

    if (
      newHashes &&
      newHashes.length > 0 &&
      val.episodes.every(e => e.magnet !== newHashes[0].magnet)
    ) {
      val.episodes.push(newHashes[0]);
      if (Notification.isSupported()) {
        const notification = new Notification({
          title: 'New episode',
          body: val.title
        });
        notification.show();
      }

      aniList = aniList.map(ele => {
        if (ele.mal_id === followedAni[i].mal_id) {
          return val;
        }

        return ele;
      });
    }
  }

  store.set('aniList', aniList);
}, 1000 * 60 * 15); // 15min

ipcMain.on('watched-episode', (event, arg) => {
  let aniList = store.get('aniList') || [];
  aniList = aniList.map(val => {
    if (
      val.mal_id === arg.mal_id &&
      !val.watchedEpisodes.includes(arg.episode.number)
    ) {
      val.watchedEpisodes.push(arg.episode.number);
    }

    return val;
  });
  store.set('aniList', aniList);
});

ipcMain.on('move-to-watched', async (event, arg) => {
  const watched = store.get('watched-animes') || [];
  if (watched.every(val => val.mal_id !== arg.mal_id)) {
    store.set('watched-animes', arg);
  }

  let followedAni = store.get('followedAni');
  let aniList = store.get('aniList');

  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id);
  aniList = aniList.filter(val => val.mal_id !== arg.mal_id);

  store.set('followedAni', followedAni);
  store.set('aniList', aniList);
});

// Use getHorribleSubs function to search for the episodes
ipcMain.on('reload-episodes', async (event, arg) => {
  let aniList = store.get('aniList') || [];
  aniList = aniList.filter(val => val.mal_id !== arg.mal_id);
  let results;
  try {
    results = await getHorribleSubs(arg.title);
  } catch (error) {
    console.error(error);
  }

  aniList.push({
    mal_id: arg.mal_id,
    title: arg.title,
    episodesNumber: arg.episodes,
    episodes: results,
    watchedEpisodes: [],
    lastUpdate: Date.now()
  });
  store.set('aniList', aniList);
});
// Unfollow an anime.
ipcMain.on('unset-followedAni', (event, arg) => {
  let followedAni = store.get('followedAni') || [];
  followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id);
  store.set('followedAni', followedAni);
});
// Get the downloaded episodes
ipcMain.on('get-downloadedEpi', async event => {
  const aniList = store.get('aniList') || [];
  const torrent = {};
  for (const val of aniList) {
    for (const valPrim of val.episodes) {
      let exist;
      try {
        exist = await fs.pathExists(valPrim.pathname);
      } catch (error) {
        console.error(error);
      }

      if (valPrim.pathname && exist) {
        torrent[valPrim.magnet] = {
          key: valPrim.magnet,
          progress: 1
        };
      }
    }
  }

  event.returnValue = torrent;
});

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer');

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js')
    }
  });
  mainWindow.webContents.openDevTools();

  const url = isDev
    ? 'http://localhost:8000/start'
    : format({
        pathname: join(__dirname, '../renderer/start/index.html'),
        protocol: 'file:',
        slashes: true
      });
  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);
