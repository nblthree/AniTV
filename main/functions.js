const fuzz = require('fuzzball');
const puppeteer = require('puppeteer');
const WebTorrent = require('webtorrent');

const client = new WebTorrent();
const isWin = process.platform === 'win32';

function isDuplicate(array, arg) {
  return array.some(val => val.magnet === arg.magnet);
}

// Encode the title to be used by puppeteer
function fixedEncodeURI(str) {
  return encodeURI(str)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, '+');
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

// Download anime episodes
function startDownloading(magnet, event, anime, { store, downloadPath }) {
  let folder = anime.title;
  // Replace illegal characters on windows
  if (isWin) {
    folder = folder.replace(/[/?%*:|"<>]/g, ' ').trim();
  }
  const magnetURI = magnet;
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

// Perform different change on the input anime title to make sure that we doesn't get an empty array in most cases
// Also return an array of the anime epidodes
// Call chooseHash function and getHashes function
function getAnimeEpisodes(anime, ep = 0) {
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
      if (ep !== 0) {
        loopLength = ep + 1;
      }
      for (let i = ep; i < loopLength; i++) {
        const item = chooseHash(await getHashes(newTitle, ep ? i : i + 1), {
          title: newTitle,
          episode: ep ? i : i + 1
        });
        if (item && !isDuplicate(newHashes, item)) {
          newHashes.push({ ...item, number: ep ? i : i + 1, pathnames: [] });
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

module.exports = { getHorribleSubs, getAnimeEpisodes, startDownloading };
