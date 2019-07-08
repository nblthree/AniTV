// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');

const fs = require('fs-extra');
const fuzz = require('fuzzball');
const puppeteer = require('puppeteer');
const WebTorrent = require('webtorrent');
const Store = require('electron-store');
const ffbinaries = require('ffbinaries');
const ffmpeg = require('fluent-ffmpeg');

var dest = __dirname + '/bin';
fs.pathExists('main/bin/ffmpeg.exe', (err, exists) => {
  console.log(exists);
  if (!exists) {
    ffbinaries.downloadBinaries({ destination: dest }, function() {
      ffmpeg.setFfmpegPath('main/bin/ffmpeg.exe');
    });
  } else {
    ffmpeg.setFfmpegPath('main/bin/ffmpeg.exe');
  }
});

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (development)`);
}

const client = new WebTorrent();
const store = new Store({ name: 'appData' });

const isWin = process.platform === 'win32';
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
  startDownloading(episode.magnet, event, anime);
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
  const aniList = store.get('aniList') || [];
  if (!aniList.length) return;
  for (let i = 0; i < aniList.length; i++) {
    const val = aniList[i];
    const { newHashes } = await getAnimeEpisodes(val, val.episodes.length + 1);
    if (newHashes.length) {
      val.episodes.push(...newHashes);
      if (Notification.isSupported()) {
        const notification = new Notification({ title: 'New episode', body: val.title });
        notification.show();
      }
    }
    aniList[i] = val;
  }
  store.set('aniList', aniList);
}, 1000 * 60 * 15); // 15min

ipcMain.on('watched-episode', (event, arg) => {
  let aniList = store.get('aniList') || [];
  aniList = aniList.map(val => {
    if (val.mal_id === arg.mal_id) {
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

// Functions..............
function isDuplicate(array, arg) {
  return array.some(val => val.magnet === arg.magnet);
}
// Perform different change on the input anime title to make sure that we doesn't get an empty array in most cases
// Also return an array of the anime epidodes
// Call chooseHash function and getHashes function
function getAnimeEpisodes(anime, ep = -1) {
  return new Promise(async resolve => {
    const titleOperations = [{ name: 'normal' }, { name: 'drop-nd-rd-th' }, { name: 'pure' }];

    const newHashes = [];
    let loopLength = 500;
    let newTitle = anime.title;
    for (const operation of titleOperations) {
      if (operation.name === 'pure') {
        newTitle = anime.title;
        newTitle = newTitle.replace(/season|nd|part|rd|th|s?\d+/gi, '').replace(/  +/g, ' ');
      } else if (operation.name === 'normal') {
        newTitle = anime.title;
        newTitle = newTitle
          .replace(/season ?/i, 'S')
          .replace(/part ?\d/i, '')
          .replace(/\s+0+(?!\.|$)/g, ' ')
          .replace(/  +/g, ' ');
      } else if (operation.name === 'drop-nd-rd-th') {
        newTitle = anime.title;
        const season = newTitle.match(/\d+/g);
        newTitle = newTitle.replace(/season|nd|part|rd|th|s?\d+/gi, '');
        newTitle += season ? ` S${season[0]}` : '';
        newTitle = newTitle.replace(/  +/g, ' ');
      }

      newTitle = newTitle.trim();
      if (ep !== -1) {
        loopLength = ep - 1;
      }
      for (let i = 0; i < loopLength; i++) {
        const item = chooseHash(await getHashes(newTitle, i + 1), {
          title: newTitle,
          episode: i + 1
        });
        if (item && !isDuplicate(newHashes, item)) {
          newHashes.push({ ...item, number: i + 1, pathnames: [] });
        } else {
          break;
        }
      }

      if (newHashes.length !== 0) break;
    }

    resolve({ newTitle, newHashes });
  });
}
// Return all episodes translated by HorribleSubs from all seasons (Match the anime title without any additions)
function getHorribleSubs(title) {
  return new Promise(async resolve => {
    const newTitle = `[HorribleSubs] ${title
      .replace(/season|nd|part|rd|th|s?\d+/gi, '')
      .replace(/  +/g, ' ')
      .trim()}`;
    let allMagnets = [];
    for (let i = 1; i < 50; i++) {
      const result = await getHashes(newTitle, -1, i);
      if (result && result.length) {
        allMagnets.push(...result);
      } else {
        break;
      }
    }

    allMagnets = allMagnets.map((val, index) => ({ ...val, number: index + 1, pathnames: [] }));
    resolve(allMagnets.sort((a, b) => a.title.localeCompare(b.title)));
  });
}
// Scrap data from nyaa. data contain magnet URI and episode title
async function getHashes(title, episode, p = 1) {
  const hashes = await new Promise(resolve => {
    void (async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(
          `https://nyaa.si/?f=0&c=1_2&q=${processTitle(title, episode)}&p=${p}&s=seeders&o=desc`
        );

        const result = await page.evaluate(() => {
          const grabFromItem = (item, selector, attr) => {
            const val = item.querySelector(selector);
            return val ? val[attr] : '';
          };

          const data = document.querySelectorAll('tr');
          const items = [...data].map(item => ({
            title: grabFromItem(item, 'td:nth-of-type(2) a:not([class])', 'title'),
            magnet: grabFromItem(item, 'td:nth-of-type(3) a:nth-of-type(2)', 'href')
          }));
          return items;
        });
        await browser.close();
        resolve(result);
      } catch (error) {
        console.log(error);
        resolve(getHashes(title, episode));
      }
    })();
  });
  return hashes.filter(val => val.title && val.magnet);
}

// Use fuzz search to get the right anime episode
function chooseHash(hashes, { title, episode }) {
  title += ` ${episode}`;
  const options = {
    scorer: fuzz.token_set_ratio,
    returnObjects: true,
    full_process: true
  };

  const choices = hashes.map(val => val.title.replace(/\s+0+(?!\.|$)/g, ' '));
  const result = fuzz.extract(title, choices, options);

  const key =
    result.length > 1
      ? result[0].key > result[1].key && result[0].score === result[1].score
        ? result[1].key
        : result[0].key
      : 0;
  return hashes[key];
}

// Add some info to the title and return the encoded title value
function processTitle(title, episode) {
  const quality = 720;
  if (episode !== -1) {
    title += ` ${episode} ${quality}`;
  } else {
    title += ` ${quality}`;
  }

  title = fixedEncodeURI(title);
  return title;
}
// Encode the title to be used by puppeteer
function fixedEncodeURI(str) {
  return encodeURI(str)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+');
}

function extractSubtitleTrack(inputFile) {
  try {
    var outputFile = inputFile.replace(/\.[^.]*$/, '') + '-subs.srt';

    var command = ffmpeg(inputFile, { logger: console.debug });
    command
      .on('start', function(command) {
        console.log('Start: ', command);
      })
      .noAudio()
      .noVideo()
      .outputOptions('-map', '0:s:0', '-c:s', 'srt')
      .output(outputFile)
      .on('error', function(err, stdout, stderr) {
        console.log('An error occurred: ' + err.message, err, stderr);
      })
      .on('end', function() {
        console.log('Processing finished !');
      });
    command.run();
  } catch (e) {
    console.log(e);
  }
}
// Download anime episodes
function startDownloading(magnet, event, anime) {
  let folder = anime.title;
  // Replace illegal characters on windows
  if (isWin) {
    folder = folder.replace(/[/?%*:|"<>]/g, ' ').trim();
  }
  const magnetURI = magnet;
  const downloadPath = app.getPath('downloads');
  const pathname = downloadPath + (downloadPath.endsWith('/') ? '' : '/') + folder;

  client.add(magnetURI, { path: pathname }, function(torrent) {
    event.sender.send('torrent-progress', {
      key: magnet,
      bytes: 0,
      downloaded: 0,
      speed: 0,
      progress: 0
    });
    console.log('Client is downloading:', torrent.infoHash);

    torrent.on('done', function() {
      console.log('torrent download finished');

      let aniList = store.get('aniList') || [];
      let { episodes } = aniList.filter(val => val.mal_id === anime.mal_id)[0];

      episodes = episodes.map(val => {
        if (val.magnet === magnetURI) {
          for (let i = 0; i < torrent.files.length; i++) {
            val.pathnames[i] = `${pathname}/${torrent.files[i].path}`;
            //let comand = ffmpeg(val.pathnames[i])
            extractSubtitleTrack(val.pathnames[i]);
          }
        }
        return val;
      });

      aniList = aniList.map(val => {
        if (val.mal_id === anime.mal_id) {
          val.episodes = episodes;
        }
        return val;
      });

      store.set('aniList', aniList);
    });
    torrent.on('error', function(err) {
      console.log(err);
    });
    torrent.on('download', function(bytes) {
      event.sender.send('torrent-progress', {
        key: magnet,
        bytes,
        downloaded: torrent.downloaded,
        speed: torrent.downloadSpeed,
        progress: torrent.progress
      });
    });
  });
}

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
