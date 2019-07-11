import { shell } from 'electron';
import { Component } from 'react';
import Layout from '../components/MyLayout';

function bytesConverter(bytes) {
  let convertedValue = (bytes / 10 ** 6).toFixed(1); // MB
  if (convertedValue < 1000) return `${convertedValue}MB`;
  convertedValue = (bytes / 10 ** 9).toFixed(1); // GB
  return `${convertedValue}GB`;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.ipcRenderer = global.ipcRenderer || false;
    this.state = {
      aniList: (this.ipcRenderer && this.ipcRenderer.sendSync('get-aniList')) || [],
      torrent: (this.ipcRenderer && this.ipcRenderer.sendSync('get-downloadedEpi')) || {},
      unfound: []
    };

    this.download = this.download.bind(this);
    this.torrentState = this.torrentState.bind(this);
    this.handleError = this.handleError.bind(this);
    this.playEpisode = this.playEpisode.bind(this);
  }

  componentDidMount() {
    this.ipcRenderer.on('torrent-progress', this.torrentState);
  }

  componentWillUnmount() {
    this.ipcRenderer.removeListener('torrent-progress', this.torrentState);
  }

  torrentState(event, arg) {
    this.setState(prev => {
      const { torrent } = prev;
      torrent[arg.key] = arg;
      if (arg.progress === 1) {
        return {
          followedAnime: this.ipcRenderer
            .sendSync('get-aniList')
            .filter(val => val.mal_id === prev.followedAnime.mal_id)[0],
          torrent
        };
      }

      return {
        torrent
      };
    });
  }

  download(obj) {
    this.ipcRenderer.send('start-download', obj);
  }

  handleError(path) {
    this.setState(prev => ({ unfound: prev.unfound.concat(path) }));
  }

  playEpisode({ mal_id, episode, target }) {
    if (!this.state.unfound.includes(target.src)) {
      shell.openExternal(target.src);
      this.ipcRenderer.send('watched-episode', { mal_id, episode });
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <div className="animeGroups">
            {this.state.aniList.map(val => {
              if (val.episodes.length === val.watchedEpisodes.length) {
                return null;
              }
              return (
                <div className="group">
                  <h2 className="animeTitle">{val.title}</h2>
                  <div className="grid">
                    {val.episodes.map(ep => {
                      if (val.watchedEpisodes.includes(ep.number)) {
                        return null;
                      }
                      return (
                        <div className="episode" key={ep.magnet + ep.number}>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: this.state.torrent[ep.magnet]
                                  ? `${this.state.torrent[ep.magnet].progress * 100}%`
                                  : 0,
                                backgroundColor:
                                  this.state.torrent[ep.magnet] &&
                                  this.state.torrent[ep.magnet].progress === 1
                                    ? '#95ff95'
                                    : '#5555ff'
                              }}
                            />
                            {this.state.torrent[ep.magnet] &&
                            this.state.torrent[ep.magnet].progress < 1 ? (
                              <div className="download_speed">
                                <span>
                                  {bytesConverter(this.state.torrent[ep.magnet].downloaded)}
                                </span>
                                <span>{bytesConverter(this.state.torrent[ep.magnet].speed)}</span>
                              </div>
                            ) : null}
                          </div>
                          {(ep.pathnames.length && !this.state.unfound.includes(ep.pathnames[0])) ||
                          (this.state.torrent[ep.magnet] &&
                            this.state.torrent[ep.magnet].progress < 1) ? (
                            <video
                              onError={() => this.handleError(ep.pathnames[0])}
                              src={ep.pathnames[0]}
                              onClick={e => {
                                this.playEpisode({
                                  mal_id: val.mal_id,
                                  episode: ep,
                                  target: e.target
                                });
                              }}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                this.download({
                                  anime: val,
                                  episode: ep
                                })
                              }
                            >
                              Download
                            </button>
                          )}
                          <div className="title">{ep.title.replace(/\[.*?\]/g, '')}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <style jsx>{`
            .animeGroups {
              width: 100%;
              height: 100%;
            }
            .group {
              box-shadow: 0px 9px 14px 0px #3f4244;
            }
            .animeTitle {
              padding: 0 0 0 25px;
            }
            .grid {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
              position: relative;
            }
            .episode {
              width: 320px;
              height: 180px;
              position: relative;
              margin: 0 7px 15px 7px;
              display: flex;
              background-color: #000;
            }
            video {
              width: 100%;
              height: 100%;
            }
            .episode button {
              width: 120px;
              height: 25px;
              border-radius: 12px;
              margin: auto;
              outline: none;
              border: 0;
              color: #fff;
              background-color: #ffffff1f;
              cursor: pointer;
            }
            .title {
              position: absolute;
              bottom: 0;
              text-align: center;
              width: 100%;
              background-color: #111111e6;
              max-height: 42px;
              overflow: hidden;
              // color: #fff;
            }
            .progress {
              position: absolute;
              top: 0;
              width: 100%;
              background-color: #111111e6;
              height: 15px;
              overflow: hidden;
              display: flex;
            }
            .progress-bar {
              height: 100%;
              width: 0;
              background-color: #5555ff;
            }
            .download_speed {
              position: absolute;
              line-height: 14px;
              color: #fff;
              width: 100%;
              display: flex;
              justify-content: space-around;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}
