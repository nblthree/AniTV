import { Component } from 'react';
import Layout from '../components/layout';
import Video from '../components/video';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.ipcRenderer = global.ipcRenderer;
    this.state = {
      aniList: [],
      torrent: {}
    };

    this.torrentState = this.torrentState.bind(this);
  }

  async componentDidMount() {
    const aniList = await this.ipcRenderer.invoke('get-aniList');
    const torrent = await this.ipcRenderer.invoke('get-downloadedEpi');
    this.setState({ aniList, torrent });
    this.ipcRenderer.on('torrent-progress', this.torrentState);
  }

  componentWillUnmount() {
    this.ipcRenderer.removeListener('torrent-progress', this.torrentState);
  }

  async torrentState(event, arg) {
    let aniList = null;
    if (arg.progress === 1) {
      aniList = await this.ipcRenderer.invoke('get-aniList');
    }

    this.setState(prev => {
      const { torrent } = prev;
      torrent[arg.key] = arg;
      if (arg.progress === 1) {
        return {
          torrent,
          aniList
        };
      }

      return {
        torrent
      };
    });
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
                <div className="group" key={val.mal_id}>
                  <h2 className="animeTitle">{val.title}</h2>
                  <div className="grid">
                    {val.episodes.map(ep => {
                      if (val.watchedEpisodes.includes(ep.number)) {
                        return null;
                      }

                      return (
                        <Video
                          key={ep.magnet + ep.number}
                          torrent={this.state.torrent}
                          anime={val}
                          ep={ep}
                        />
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
