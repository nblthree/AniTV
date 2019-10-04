import { Component } from 'react';

function bytesConverter(bytes) {
  let convertedValue = (bytes / 10 ** 6).toFixed(1); // MB
  if (convertedValue < 1000) return `${convertedValue}MB`;
  convertedValue = (bytes / 10 ** 9).toFixed(1); // GB
  return `${convertedValue}GB`;
}

export default class video extends Component {
  render() {
    return (
      <div className="episode">
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: this.props.torrent[this.props.ep.magnet]
                ? `${this.props.torrent[this.props.ep.magnet].progress * 100}%`
                : 0,
              backgroundColor:
                this.props.torrent[this.props.ep.magnet] &&
                this.props.torrent[this.props.ep.magnet].progress === 1
                  ? '#95ff95'
                  : '#5555ff'
            }}
          />
          {this.props.torrent[this.props.ep.magnet] &&
          this.props.torrent[this.props.ep.magnet].progress < 1 ? (
            <div className="download_speed">
              <span>
                {bytesConverter(
                  this.props.torrent[this.props.ep.magnet].downloaded
                )}
              </span>
              <span>
                {bytesConverter(this.props.torrent[this.props.ep.magnet].speed)}
              </span>
            </div>
          ) : null}
        </div>
        {(this.props.ep.pathnames.length > 0 &&
          !this.props.unfound.includes(this.props.ep.pathnames[0])) ||
        (this.props.torrent[this.props.ep.magnet] &&
          this.props.torrent[this.props.ep.magnet].progress <= 1) ? (
          <video
            onError={() => this.props.handleError(this.props.ep.pathnames[0])}
            src={this.props.ep.pathnames[0]}
            onClick={e => {
              if (this.props.ep.pathnames[0]) {
                this.props.playEpisode({
                  mal_id: this.props.anime.mal_id,
                  episode: this.props.ep,
                  target: e.target
                });
              }
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() =>
              this.props.download({
                anime: this.props.anime,
                episode: this.props.ep
              })
            }
          >
            Download
          </button>
        )}
        <div className="title">
          {this.props.ep.title.replace(/\[.*?\]/g, '')}
        </div>
        <style jsx>{`
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
    );
  }
}
