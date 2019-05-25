import electron from 'electron'
import { Component } from 'react'
import Layout from '../components/MyLayout'
import Cadre from '../components/Cadre'

export default class extends Component {
  constructor(props) {
    super(props)
    this.ipcRenderer = electron.ipcRenderer || false
    this.state = {
      animesTV: this.ipcRenderer.sendSync('get-season') || [],
      followedAni: this.ipcRenderer.sendSync('get-followedAni') || [],
      info: false
    }
    this.handleInfo = this.handleInfo.bind(this)
    this.handlefollowing = this.handlefollowing.bind(this)
  }

  async componentDidMount() {
    const response = await fetch(
      `https://api.jikan.moe/v3/season/${new Date().getYear() +
        1900}/${getSeason()}`
    )
    let data = await response.json()

    const animesTV = data.anime.filter(val => val.type === 'TV')
    if (!animesTV || animesTV.length === 0) return
    this.setState({ animesTV })
    if (this.ipcRenderer) {
      this.ipcRenderer.send('set-season', this.state.animesTV)
    }
  }

  handleInfo(info) {
    this.setState({ info })
  }

  handlefollowing({ anime, follow }) {
    if (this.ipcRenderer) {
      if (follow) {
        this.ipcRenderer.send('set-followedAni', anime)
      } else {
        this.ipcRenderer.send('unset-followedAni', anime)
      }
    }
  }

  render() {
    return (
      <Layout>
        <div id="grid">
          {this.state.info ? (
            <div id="info">
              <div
                className="exit"
                onClick={() => {
                  this.handleInfo(false)
                }}
              />
              <div className="title">{this.state.info.title}</div>
              <div className="synopsis">{this.state.info.synopsis}</div>
              <div className="data">
                <div>Airing Start: {this.state.info.airing_start}</div>
                <div>Episodes: {this.state.info.episodes}</div>
                <div>
                  Genres:{' '}
                  {this.state.info.genres.map(val => val.name).join(', ')}
                </div>
                <div>MAL Rating: {this.state.info.score}</div>
              </div>
            </div>
          ) : null}
          {this.state.animesTV.map((val, index) => {
            return (
              <Cadre
                followedAni={this.state.followedAni}
                follow={this.handlefollowing}
                info={this.handleInfo}
                anime={val}
                key={val.mal_id}
              />
            )
          })}
          <style jsx>{`
            #grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              position: relative;
            }
            #info {
              position: fixed; // absolute
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1000000;
              background-color: #000000de;
              padding: 0 50px;
              box-sizing: border-box;
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
    )
  }
}

function getSeason() {
  const month = new Date().getMonth() + 1
  let season = ''
  switch (month) {
    case 12:
    case 1:
    case 2:
      season = 'winter'
      break
    case 3:
    case 4:
    case 5:
      season = 'spring'
      break
    case 6:
    case 7:
    case 8:
      season = 'summer'
      break
    case 9:
    case 10:
    case 11:
      season = 'fall'
      break
    default:
      season = 'spring'
  }

  return season
}
