const fuzz = require('fuzzball');
const got = require('got');
const { DOMParser } = require('xmldom');

const isWin = process.platform === 'win32';

function isDuplicate(array, arg) {
  return array.some(val => val.magnet === arg.magnet);
}

// Encode the title to be used by got
function fixedEncodeURI(str) {
  return encodeURI(str)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+');
}

// Add some info to the title and return the encoded title value
function processTitle(title, episode, resolution) {
  if (episode !== -1) {
    title += ` ${episode} ${resolution}`;
  } else {
    title += ` ${resolution}`;
  }

  title = fixedEncodeURI(title);
  return title;
}

function bytesConverter(bytes) {
  let convertedValue = (bytes / 10 ** 3).toFixed(1); // KB
  if (convertedValue < 1000) return `${convertedValue} KB/s`;
  convertedValue = (bytes / 10 ** 6).toFixed(1); // MB
  if (convertedValue < 1000) return `${convertedValue} MB/s`;
  convertedValue = (bytes / 10 ** 9).toFixed(1); // GB
  return `${convertedValue} GB/s`;
}

// Scrap data from nyaa. data contain magnet URI and episode title
async function getHashes(title, episode, { pageNumber = 1, resolution }) {
  const hashes = await new Promise(resolve => {
    (async () => {
      try {
        const response = await got(
          `https://nyaa.si/?page=rss&f=0&c=1_2&q=${processTitle(
            title,
            episode,
            resolution
          )}&p=${pageNumber}&s=seeders&o=desc`
        );
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.body, 'application/xml');
        const items = xmlDoc.getElementsByTagName('item');
        const result = [];

        for (let i = 0; i < items.length; i++) {
          result.push({
            title: items[i].getElementsByTagName('title')[0].textContent,
            magnet: items[i].getElementsByTagName('nyaa:infoHash')[0].textContent
          });
        }

        resolve(result);
      } catch (error) {
        console.error(error);
        resolve(getHashes(title, episode, { pageNumber, resolution }));
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

// Download anime episodes
function startDownloading(
  magnet,
  anime,
  { store, downloadPath, mainWindow, client }
) {
  let folder = anime.title;
  // Replace illegal characters on windows
  if (isWin) {
    folder = folder.replace(/[/?%*:|"<>]/g, ' ').trim();
  }

  const magnetURI = magnet;
  const pathname =
    downloadPath + (downloadPath.endsWith('/') ? '' : '/') + folder;

  client.add(magnetURI, { path: pathname }, function(torrent) {
    console.log('Client is downloading:', torrent.infoHash);

    const aniList = store.get('aniList') || [];
    aniList.forEach(val => {
      if (val.mal_id === anime.mal_id) {
        val.episodes.forEach(ep => {
          if (ep.magnet === magnetURI) {
            ep.inProgress = true;
          }
        });
      }
    });
    store.set('aniList', aniList);

    mainWindow.webContents.send('torrent-progress', {
      key: magnet,
      bytes: 0,
      downloaded: torrent.downloaded,
      speed: torrent.downloadSpeed,
      progress: torrent.progress
    });

    torrent.on('download', function(bytes) {
      mainWindow.webContents.send('torrent-progress', {
        key: magnet,
        bytes,
        downloaded: torrent.downloaded,
        speed: torrent.downloadSpeed,
        progress: torrent.progress
      });
    });

    torrent.on('done', function() {
      console.log('torrent download finished');
      const aniList = store.get('aniList') || [];
      aniList.forEach(val => {
        if (val.mal_id === anime.mal_id) {
          val.episodes.forEach(ep => {
            if (ep.magnet === magnetURI) {
              for (let i = 0; i < torrent.files.length; i++) {
                ep.pathnames[i] = `${pathname}/${torrent.files[i].path}`;
              }

              ep.inProgress = false;
            }
          });
        }
      });
      store.set('aniList', aniList);
    });

    torrent.on('error', function(err) {
      console.log(err);
    });
  });
}

// Perform different change on the input anime title to make sure that we doesn't get an empty array in most cases
// Also return an array of the anime epidodes
// Call chooseHash function and getHashes function
function getAnimeEpisodes(anime, resolution) {
  return new Promise(async resolve => {
    const titleOperations = [
      { name: 'normal' },
      { name: 'drop-nd-rd-th' },
      { name: 'pure' }
    ];

    const newHashes = [];
    const loopLength = 500;
    let newTitle = anime.title;
    for (const operation of titleOperations) {
      if (operation.name === 'pure') {
        newTitle = anime.title;
        newTitle = newTitle
          .replace(/season|nd|part|rd|th|s?\d+/gi, '')
          .replace(/  +/g, ' ');
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

      for (let i = 1; i < loopLength; i++) {
        let item;
        try {
          item = chooseHash(await getHashes(newTitle, i, { resolution }), {
            title: newTitle,
            episode: i
          });
        } catch (error) {
          console.error(error);
        }

        if (item && !isDuplicate(newHashes, item)) {
          newHashes.push({ ...item, number: i, pathnames: [] });
        } else {
          break;
        }
      }

      if (newHashes.length !== 0) break;
    }

    resolve({ newTitle, newHashes });
  });
}

// Return all episodes translated by [Erai-raws] from all seasons (Match the anime title without any additions)
function getTorrentsEpisodes(title, resolution) {
  return new Promise(async resolve => {
    const newTitle = `[Erai-raws] ${title
      .replace(/season|nd|part|rd|th|s?\d+/gi, '')
      .replace(/  +/g, ' ')
      .trim()}`;
    let allMagnets = [];
    for (let pageNumber = 1; pageNumber < 50; pageNumber++) {
      let result;
      try {
        result = await getHashes(newTitle, -1, { pageNumber, resolution });
      } catch (error) {
        console.error(error);
      }

      if (result && result.length > 0) {
        allMagnets.push(...result);
      } else {
        break;
      }
    }

    allMagnets = allMagnets.map((val, index) => ({
      ...val,
      number: index + 1,
      pathnames: []
    }));
    resolve(allMagnets.sort((a, b) => a.title.localeCompare(b.title)));
  });
}

module.exports = {
  getTorrentsEpisodes,
  getAnimeEpisodes,
  startDownloading,
  bytesConverter
};
