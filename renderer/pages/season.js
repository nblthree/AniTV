import { Component } from 'react';
import Layout from '../components/layout';
import Cadre from '../components/cadre';

function getSeason() {
  const month = new Date().getMonth() + 1;
  let season = '';
  switch (month) {
    case 1:
    case 2:
    case 3:
      season = 'winter';
      break;
    case 4:
    case 5:
    case 6:
      season = 'spring';
      break;
    case 7:
    case 8:
    case 9:
      season = 'summer';
      break;
    case 10:
    case 11:
    case 12:
      season = 'fall';
      break;
    default:
      season = 'spring';
  }

  return season;
}

export default class Season extends Component {
  constructor(props) {
    super(props);
    this.ipcRenderer = global.ipcRenderer;
    this.state = {
      animesTV: [],
      followedAni: [],
      info: false,
      onLoad: false
    };
    this.dataLoading = this.dataLoading.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handlefollowing = this.handlefollowing.bind(this);
  }

  async componentDidMount() {
    const animesTV = await this.ipcRenderer.invoke('get-season');
    const followedAni = await this.ipcRenderer.invoke('get-followedAni');
    this.setState({ animesTV, followedAni });

    try {
      let allAnimesTV = [];
      const baseUrl = `https://api.jikan.moe/v4/seasons/${new Date().getYear() + 1900}/${getSeason()}`;
      for (let page = 1; page <= 3; page++) {
        try {
          const response = await fetch(`${baseUrl}?page=${page}`);
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            allAnimesTV = allAnimesTV.concat(data.data.filter(val => val.type === 'TV'));
          } else {
            // No more data, break early
            break;
          }
        } catch (error) {
          console.error(`Error fetching page ${page}:`, error);
          // Optionally break or continue if one page fails
        }
      }

      if (!allAnimesTV || allAnimesTV.length === 0) return;
      this.setState({ animesTV: allAnimesTV });
      if (this.ipcRenderer) {
        this.ipcRenderer.send('set-season', allAnimesTV); // Use allAnimesTV here
      }
    } catch (error) {
      console.log(error);
    }

    this.ipcRenderer.on('onload', this.dataLoading);
  }

  componentWillUnmount() {
    this.ipcRenderer.removeListener('onload', this.dataLoading);
  }

  dataLoading(event, onLoad) {
    this.setState({ onLoad });
  }

  handleInfo(info) {
    this.setState({ info });
  }

  handlefollowing({ anime, follow }) {
    if (this.ipcRenderer) {
      if (follow) {
        this.setState({ onLoad: true });
        this.ipcRenderer.send('set-followedAni', anime);
      } else {
        this.ipcRenderer.send('unset-followedAni', anime);
      }
    }
  }

  render() {
    return (
      <Layout>
        <div id="grid">
          {this.state.onLoad ? (
            <div className="onload absoluteDiv">
              <div>
                <div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
                </div>
                <div className="ld">Loading Data...</div>
              </div>
            </div>
          ) : null}
          {this.state.info ? (
            <div className="info absoluteDiv">
              <div
                role="button"
                className="exit"
                onClick={() => {
                  this.handleInfo(false);
                }}
              />
              <div className="title">{this.state.info.title}</div>
              <div className="synopsis">{this.state.info.synopsis}</div>
              <div className="data">
                <div>Airing Start: {this.state.info.aired && this.state.info.aired.from}</div>
                <div>Episodes: {this.state.info.episodes}</div>
                <div>
                  Genres:{' '}
                  {this.state.info.genres.map(val => val.name).join(', ')}
                </div>
                <div>MAL Rating: {this.state.info.score}</div>
              </div>
            </div>
          ) : null}
          {this.state.animesTV.map(val => {
            return (
              <Cadre
                followedAni={this.state.followedAni}
                follow={this.handlefollowing}
                info={this.handleInfo}
                anime={val}
                key={val.mal_id}
              />
            );
          })}
          <style jsx>{`
            #grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              position: relative;
            }
            .absoluteDiv {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1000000;
              background-color: #000000de;
              padding: 0 50px;
              box-sizing: border-box;
            }
            .onload {
              display: flex;
            }
            .onload > div {
              margin: auto;
            }
            .ld {
              font-size: 1.2rem;
              margin-top: 20px;
            }
            .spinner {
              width: 40px;
              height: 40px;
              position: relative;
              margin: auto;
            }
            .double-bounce1,
            .double-bounce2 {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #ececec;
              opacity: 0.6;
              position: absolute;
              top: 0;
              left: 0;
              animation: sk-bounce 2s infinite ease-in-out;
            }
            .double-bounce2 {
              animation-delay: -1s;
            }
            @keyframes sk-bounce {
              0%,
              100% {
                transform: scale(0);
              }
              50% {
                transform: scale(1);
              }
            }
            .title {
              text-align: center;
              font-weight: 600;
              font-size: 2rem;
              padding: 50px 0;
            }
            .synopsis {
              font-size: 1.05rem;
              text-indent: 2rem;
              max-width: 800px;
              margin: auto;
              margin-bottom: 20px;
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
            .data {
              max-width: 800px;
              margin: auto;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}
