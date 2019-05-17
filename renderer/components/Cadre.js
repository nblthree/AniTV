import React, { Component } from 'react';

export default class extends Component {
  constructor(props){
    super(props);
  }


  componentDidMount() {

  }


  render() {
    return (
        <div className="cadre">
          <div className="img"></div>
          <div className="info">
            <button onClick={() => {this.props.info(this.props.anime)}}>Info</button>
            <button>Follow</button>
          </div>
          <div className="title">{this.props.anime.title}</div>
        <style jsx>{`
            .cadre {
              width: 225px;
              height: 318px;
              position: relative;
              margin-bottom: 15px;
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
