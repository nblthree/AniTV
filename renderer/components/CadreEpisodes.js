import { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished_airing: false
    };
  }

  render() {
    return (
      <div className="cadre">
        <div className="state">
          {this.state.finished_airing ? 'finished Airing' : `1/${this.props.anime.episodes}`}
        </div>
        <div role="button" className="reload" onClick={() => this.props.reload(this.props.anime)}>
          Reload
        </div>
        <div
          role="button"
          className="img"
          onClick={() => this.props.showEpisodes(this.props.anime)}
        />
        <div className="title">{this.props.anime.title}</div>
        <style jsx>{`
            .cadre {
              width: 225px;
              height: 318px;
              position: relative;
              margin: 0 7px 15px 7px;
            }
            .state, .reload {
              position: absolute;
              top: 0;
              width: 60px;
              height: 20px;
              font-size: 12px;
              text-align: center;
              line-height: 20px;
              color: #fff;
            }
            .state {
              top: 0;
              left: 0;
              background-color: blue;
            }
            .reload {
              right: 0;
              background-color: red;
              cursor: pointer;
            }
            .img {
              width: 100%;
              height: 100%;
              background: url('${this.props.anime.image_url}')
            }
            .title {
              position: absolute;
              bottom: 0;
              text-align: center;
              width: 100%;
              background-color: #111111e6;
              max-height: 45px;
              overflow: hidden;
              // color: #fff;
            }
            .info {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background-color: #111111e6;
              display: flex;
              opacity: 0;
            }
            .info:hover {
              opacity: 1;
            }
            .info button {
              width: 85px;
              height: 45px;
              border-radius: 12px;
              margin: auto;
              outline: none;
              border: 0;
              color: #fff;
              background-color: #ffffff1f;
              cursor: pointer;
            }
            .info button:hover {
              border: 0.5px solid #aaa;
            }
        `}</style>
      </div>
    );
  }
}
