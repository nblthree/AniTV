import { Component } from 'react';

export default class Cadre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followed:
        this.props.followedAni &&
        this.props.followedAni.some(
          val => val.mal_id === this.props.anime.mal_id
        )
    };
  }

  render() {
    // Add comprehensive logging for debugging image URLs
    console.log('Cadre component - Anime data for image:', JSON.stringify(this.props.anime, null, 2));
    console.log('Cadre component - Attempting to use image URL (direct):', this.props.anime.image_url);
    console.log('Cadre component - Attempting to use image URL (v4 structure):', this.props.anime.images?.jpg?.image_url);

    return (
      <div className="cadre">
        {this.state.followed ? <div className="followed">Followed</div> : null}
        <div className="img" />
        <div className="info">
          <button
            type="button"
            onClick={() => {
              this.props.info(this.props.anime);
            }}
          >
            Info
          </button>
          {this.props.follow ? (
            <button
              type="button"
              onClick={() => {
                this.props.follow({
                  anime: this.props.anime,
                  follow: !this.state.followed
                });
                this.setState(prev => ({ followed: !prev.followed }));
              }}
            >
              {this.state.followed ? 'Unfollow' : 'Follow'}
            </button>
          ) : null}
        </div>
        <div className="title">{this.props.anime.title}</div>
        <style jsx>{`
            .cadre {
              width: 225px;
              height: 318px;
              position: relative;
              margin: 0 7px 15px 7px;
            }
            .followed {
              position: absolute;
              top: 0;
              left: 0;
              width: 60px;
              height: 20px;
              font-size: 12px;
              background-color: blue;
              text-align: center;
              line-height: 20px;
              color: #fff;
            }
            .img {
              width: 100%;
              height: 100%;
              background: url('${this.props.anime.images && this.props.anime.images.jpg && this.props.anime.images.jpg.image_url}')
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
