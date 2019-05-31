import electron from 'electron'
import { Component } from 'react'
import Layout from '../components/MyLayout'
import CadreEpisodes from '../components/CadreEpisodes'

export default class extends Component {
  constructor(props) {
    super(props)
    this.ipcRenderer = electron.ipcRenderer || false
    this.state = {
      animesTV: this.ipcRenderer.sendSync('get-followedAni') || [],
      followedAnime: false,
      torrent: this.ipcRenderer.sendSync('get-downloadedEpi') || {}
    }

    this.showEpisodes = this.showEpisodes.bind(this)
    this.download = this.download.bind(this)
    this.playEpisode = this.playEpisode.bind(this)
    this.torrentState = this.torrentState.bind(this)
    this.reload = this.reload.bind(this)
  }

  componentDidMount() {
    this.ipcRenderer.on('torrent-progress', this.torrentState)
  }

  componentWillUnmount() {
    this.ipcRenderer.removeListener('torrent-progress', this.torrentState)
  }

  torrentState(event, arg) {
    this.setState(prev => {
      const { torrent } = prev
      torrent[arg.key] = arg
      if (arg.progress === 1) {
        return {
          followedAnime: this.ipcRenderer
            .sendSync('get-aniList')
            .filter(val => val.mal_id === prev.followedAnime.mal_id)[0],
          torrent
        }
      }

      return {
        torrent
      }
    })
  }

  showEpisodes(anime) {
    this.setState({
      followedAnime: anime
        ? this.ipcRenderer
            .sendSync('get-aniList')
            .filter(val => val.mal_id === anime.mal_id)[0]
        : false
    })
  }

  reload(anime) {
    this.ipcRenderer.send('reload-episodes', anime)
  }

  download(obj) {
    this.ipcRenderer.send('start-download', obj)
  }

  playEpisode({ target }) {
    target.webkitRequestFullscreen()
    if (target.paused) {
      target.play()
    }
  }

  render() {
    return (
      <Layout>
        <div>
          {this.state.followedAnime ? (
            <div className="episodes">
              <div
                className="exit"
                onClick={() => {
                  this.showEpisodes(false)
                }}
              />
              <div className="grid">
                {this.state.followedAnime.episodes.map(val => {
                  return (
                    <div className="episode" key={val.magnet + val.number}>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: this.state.torrent[val.magnet]
                              ? this.state.torrent[val.magnet].progress * 100 +
                                '%'
                              : 0,
                            backgroundColor:
                              this.state.torrent[val.magnet] &&
                              this.state.torrent[val.magnet].progress === 1
                                ? '#95ff95'
                                : '#5555ff'
                          }}
                        />
                        {this.state.torrent[val.magnet] &&
                        this.state.torrent[val.magnet].progress < 1 ? (
                          <div className="download_speed">
                            <span>
                              {bytesConverter(
                                this.state.torrent[val.magnet].downloaded
                              )}
                            </span>
                            <span>
                              {bytesConverter(
                                this.state.torrent[val.magnet].speed
                              )}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      {this.state.torrent[val.magnet] ? (
                        <video
                          src={val.pathnames[0]}
                          onClick={e => this.playEpisode(e)}
                        />
                      ) : (
                        <button
                          onClick={() =>
                            this.download({
                              anime: this.state.followedAnime,
                              episode: val
                            })
                          }
                        >
                          Download
                        </button>
                      )}
                      <div className="title">
                        {val.title.replace(/\[.*?\]/g, '')}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="grid">
              {this.state.animesTV.map((val, index) => {
                return (
                  <CadreEpisodes
                    showEpisodes={this.showEpisodes}
                    reload={this.reload}
                    anime={val}
                    key={val.mal_id}
                  />
                )
              })}
            </div>
          )}
          <style jsx>{`
            .grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              position: relative;
            }
            .episodes {
              position: relative;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              padding: 0 50px;
              box-sizing: border-box;
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
            .exit {
              width: 50px;
              height: 50px;
              position: fixed;
              top: 20px;
              left: 20px;
              cursor: pointer;
            }
            .exit:before,
            .exit:after {
              content: '';
              width: 40px;
              height: 2px;
              background-color: #fff;
              position: absolute;
              top: calc(25px - 1px);
              left: 5px;
              transform-origin: center;
            }
            .exit:before {
              transform: rotateZ(45deg);
            }
            .exit:after {
              transform: rotateZ(-45deg);
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}

function bytesConverter(bytes) {
  let convertedValue = (bytes / 10 ** 6).toFixed(1) // MB
  if (convertedValue < 1000) return `${convertedValue}MB`
  convertedValue = (bytes / 10 ** 9).toFixed(1) // GB
  return `${convertedValue}GB`
}
