import { Component } from 'react';
import Layout from '../components/layout';
import Cadre from '../components/cadre';

export default class Watched extends Component {
  constructor(props) {
    super(props);
    this.ipcRenderer = global.ipcRenderer;
    this.state = {
      watchedAni: [],
      info: false
    };

    this.handleInfo = this.handleInfo.bind(this);
  }

  async componentDidMount() {
    const watchedAni = await this.ipcRenderer.invoke('get-watchedAni');
    this.setState({ watchedAni });
  }

  handleInfo(info) {
    this.setState({ info });
  }

  render() {
    return (
      <Layout>
        <div id="grid">
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
          {this.state.watchedAni.map(val => {
            return (
              <Cadre info={this.handleInfo} anime={val} key={val.mal_id} />
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
