import { Component } from 'react'
import Layout from './../components/MyLayout'
import CadreEpisodes from './../components/CadreEpisodes'
import electron from 'electron';

export default class extends Component {
  /*static async getInitialProps(){
  	const response = await fetch(`https://api.jikan.moe/v3/season/${(new Date()).getYear() + 1900}/${getSeason()}`)
    const data = await response.json()

    const animesTV = data.anime.filter(val => val.type === 'TV')
    console.log(animesTV)
    return { animesTV }
  }*/
  ipcRenderer = electron.ipcRenderer || false;
  constructor(props) {
    super(props);
    this.state = {
    	animesTV: this.ipcRenderer.sendSync('get-followedAni') || [],
    	episodes: false
    };

  }
  async componentDidMount() {

  }

  render() {
    return (
      <Layout>
        <div id="grid">
          { this.state.episodes ? null : null }
          {
          	this.state.animesTV.map((val, index) => {
          		return (
          		 <CadreEpisodes anime={val} key={val.mal_id} />
          		)
          	})
          }
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
