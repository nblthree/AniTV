// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');

const fs = require('fs-extra');
const Store = require('electron-store');
const ffbinaries = require('ffbinaries');
const ffmpeg = require('fluent-ffmpeg');

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (development)`);
}
const store = new Store({ name: 'appData' });

// const isWin = process.platform === 'win32';
const dest = `${__dirname}/bin`;

fs.pathExists('main/bin/ffmpeg.exe', (err, exists) => {
  if (!exists) {
    ffbinaries.downloadBinaries({ destination: dest }, function() {
      ffmpeg.setFfmpegPath('main/bin/ffmpeg.exe');
    });
  } else {
    ffmpeg.setFfmpegPath('main/bin/ffmpeg.exe');
  }
});

const { getHorribleSubs, getAnimeEpisodes, startDownloading } = require('./functions');

// Events Listening..........
// get-set the animes of the current season
ipcMain.on('get-season', event => {
  event.returnValue = store.get('season') || [];
});
ipcMain.on('set-season', (event, arg) => {
  store.set('season', arg);
});
// get the followed animes with additional data like episodes torrent Magnet URI
ipcMain.on('get-aniList', event => {
  event.returnValue = store.get('aniList') || [];
});
// Trigger download (triggered by a click on a button)
ipcMain.on('start-download', (event, { anime, episode }) => {
  startDownloading(episode.magnet, event, anime, {
    store,
    ffmpeg,
    downloadPath: app.getPath('downloads')
  });
});
// get the followed animes
ipcMain.on('get-followedAni', event => {
  event.returnValue = store.get('followedAni') || [];
});
// set the followed animes and update aniList
ipcMain.on('set-followedAni', async (event, arg) => {
  const followedAni = store.get('followedAni') || [];
  followedAni.push(arg);
  store.set('followedAni', followedAni);

  // Episodes
  const aniList = store.get('aniList') || [];

  const { newTitle, newHashes } = await getAnimeEpisodes(arg);
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
});
// Check for new episodes each 15 minutes
setInterval(async () => {
  const followedAni = store.get('followedAni') || [];
  let aniList = store.get('aniList') || [];
  if (!followedAni.length) return;
  for (let i = 0; i < followedAni.length; i++) {
    const val = aniList.filter(ele => ele.mal_id === followedAni[i].mal_id)[0];
    const { newHashes } = await getAnimeEpisodes(val, val.episodes.length + 1);
    if (newHashes.length && val.episodes.every(e => e.magnet !== newHashes[0].magnet)) {
      val.episodes.push(newHashes[0]);
      if (Notification.isSupported()) {
        const notification = new Notification({ title: 'New episode', body: val.title });
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
    if (val.mal_id === arg.mal_id && !val.watchedEpisodes.includes(arg.episode.number)) {
      val.watchedEpisodes.push(arg.episode.number);
    }
    return val;
  });
  store.set('aniList', aniList);
});

// Use getHorribleSubs function to search for the episodes
ipcMain.on('reload-episodes', async (event, arg) => {
  let aniList = store.get('aniList') || [];
  aniList = aniList.filter(val => val.mal_id !== arg.mal_id);
  const results = await getHorribleSubs(arg.title);
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
      if (valPrim.pathname && (await fs.pathExists(valPrim.pathname))) {
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
