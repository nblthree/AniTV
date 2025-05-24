// Native
const { join } = require('path');

// Packages
const { ipcMain, Notification, dialog } = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs-extra');
const Store = require('electron-store');
const WebTorrent = require('webtorrent');

const client = new WebTorrent();

const {
  getTorrentsEpisodes,
  getAnimeEpisodes,
  startDownloading,
  bytesConverter
} = require('./functions');

module.exports = (app, mainWindow, tray) => {
  if (isDev) {
    const userDataPath = app.getPath('userData');
    app.setPath('userData', `${userDataPath} (development)`);
  }

  const store = new Store({ name: 'appData' });

  const defaultOptions = {
    downloadPath: app.getPath('downloads'),
    resolution: '720',
    timeInterval: '15',
    runOnBoot: false
  };

  app.setLoginItemSettings({
    openAtLogin: { ...defaultOptions, ...(store.get('options') || {}) }
      .runOnBoot,
    path: app.getPath('exe')
  });

  ipcMain.handle('get-options', async () => {
    const options = { ...defaultOptions, ...(store.get('options') || {}) };
    return options;
  });

  ipcMain.on('set-path', async event => {
    const options = { ...defaultOptions, ...(store.get('options') || {}) };
    let dirDialog = null;
    try {
      dirDialog = await dialog.showOpenDialog({
        properties: ['openDirectory']
      });
    } catch (error) {
      console.error(error);
    }

    options.downloadPath =
      dirDialog && !dirDialog.canceled
        ? dirDialog.filePaths[0]
        : options.downloadPath;
    store.set('options', options);
    event.sender.send('reload-path', options.downloadPath);
  });

  ipcMain.on('set-resolution', (event, arg) => {
    const options = { ...defaultOptions, ...(store.get('options') || {}) };
    options.resolution = arg;
    store.set('options', options);
  });

  ipcMain.on('set-timeInterval', (event, arg) => {
    const options = { ...defaultOptions, ...(store.get('options') || {}) };
    options.timeInterval = arg;
    store.set('options', options);
  });

  ipcMain.on('set-runOnBoot', (event, arg) => {
    const options = { ...defaultOptions, ...(store.get('options') || {}) };
    options.runOnBoot = arg;
    app.setLoginItemSettings({
      openAtLogin: arg,
      path: app.getPath('exe')
    });
    store.set('options', options);
  });

  // Get-set the animes of the current season
  ipcMain.handle('get-season', async () => {
    return store.get('season') || [];
  });

  ipcMain.on('set-season', (event, arg) => {
    store.set('season', arg);
  });

  // Get the followed animes with additional data like episodes torrent Magnet URI
  ipcMain.handle('get-aniList', async () => {
    return store.get('aniList') || [];
  });

  // Trigger download (triggered by a click on a button)
  ipcMain.on('start-download', (event, { anime, episode }) => {
    const { downloadPath } = {
      ...defaultOptions,
      ...(store.get('options') || {})
    };
    startDownloading(episode.magnet, anime, {
      store,
      downloadPath,
      mainWindow,
      client
    });
  });

  tray.on('mouse-move', () => {
    tray.setToolTip(
      `${app.name} ${app.getVersion()}\n${
        client.torrents.length
      } downloading, ${0} seeding\n${bytesConverter(
        client.downloadSpeed
      )} down, ${bytesConverter(client.uploadSpeed)} up`
    );
  });

  // Continue downloading
  const { downloadPath } = {
    ...defaultOptions,
    ...(store.get('options') || {})
  };
  const aniListCD = store.get('aniList') || [];
  aniListCD.forEach(anime => {
    anime.episodes.forEach(ep => {
      if (ep.inProgress) {
        startDownloading(ep.magnet, anime, {
          store,
          downloadPath,
          mainWindow,
          client
        });
      }
    });
  });

  // Get the followed animes
  ipcMain.handle('get-followedAni', async () => {
    return store.get('followedAni') || [];
  });

  // Get the watched animes
  ipcMain.handle('get-watchedAni', async () => {
    return store.get('watchedAni') || [];
  });

  // Set the followed animes and update aniList
  ipcMain.on('set-followedAni', async (event, arg) => {
    const followedAni = store.get('followedAni') || [];
    followedAni.push(arg);
    store.set('followedAni', followedAni);

    // Episodes
    const aniList = store.get('aniList') || [];
    const { resolution } = {
      ...defaultOptions,
      ...(store.get('options') || {})
    };

    let newTitle;
    let newHashes;
    try {
      const result = await getAnimeEpisodes(arg, resolution);
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

  const { timeInterval } = {
    ...defaultOptions,
    ...(store.get('options') || {})
  };
  // Check for new episodes each timeInterval minutes
  setInterval(async () => {
    const followedAni = store.get('followedAni') || [];
    let aniList = store.get('aniList') || [];
    if (followedAni.length === 0) return;
    for (let i = 0; i < followedAni.length; i++) {
      const val = aniList.filter(
        ele => ele.mal_id === followedAni[i].mal_id
      )[0];
      if (!val) return;
      let newHashes = [];
      const { resolution } = {
        ...defaultOptions,
        ...(store.get('options') || {})
      };
      try {
        const result = await getAnimeEpisodes(val, resolution);
        newHashes = result.newHashes;
      } catch (error) {
        console.error(error);
      }

      newHashes = newHashes.filter(
        val_z => !val.episodes.some(val_y => val_y.magnet === val_z.magnet)
      );

      if (newHashes && newHashes.length > 0) {
        val.episodes.push(...newHashes);
        if (Notification.isSupported()) {
          const notification = new Notification({
            title: 'New episode',
            body: val.title,
            icon: join(__dirname, 'static/icons/icon.png')
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
  }, 1000 * 60 * timeInterval);

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
    const watched = store.get('watchedAni') || [];
    if (watched.every(val => val.mal_id !== arg.mal_id)) {
      watched.push(arg);
    }

    store.set('watchedAni', watched);

    let followedAni = store.get('followedAni');
    let aniList = store.get('aniList');

    followedAni = followedAni.filter(val => val.mal_id !== arg.mal_id);
    aniList = aniList.filter(val => val.mal_id !== arg.mal_id);

    store.set('followedAni', followedAni);
    store.set('aniList', aniList);
  });

  // Use getTorrentsEpisodes function to search for the episodes
  ipcMain.on('reload-episodes', async (event, arg) => {
    let aniList = store.get('aniList') || [];
    aniList = aniList.filter(val => val.mal_id !== arg.mal_id);
    let results;
    const { resolution } = {
      ...defaultOptions,
      ...(store.get('options') || {})
    };
    try {
      results = await getTorrentsEpisodes(arg.title, resolution);
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
  ipcMain.handle('get-downloadedEpi', async () => {
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

    return torrent;
  });
};
