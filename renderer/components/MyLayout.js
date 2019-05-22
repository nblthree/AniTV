import React from 'react'
import Menu from './MainMenu'

class Layout extends React.Component {
  render() {
    return (
      <>
        <div id="window">
          <div>{this.props.children}</div>
        </div>
        <Menu />
        <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
            font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
              'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
              'Droid Sans', 'Helvetica Neue', 'sans-serif';
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
          ul {
            list-style: none;
          }
          a {
            text-decoration: none;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }
          body > div {
            width: 100%;
            height: 100%;
            min-width: 800px;
            min-height: 600px;
            background-color: #96999c;
            color: #dddddd;
          }
          #window {
            width: 100%;
            height: calc(100% - 50px);
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            transition: 0.5s ease-in;
            z-index: 1;
            background-color: #222;
          }
          #window > div:nth-child(1) {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            position: relative;
            box-sizing: border-box;
            background-color: transparent;
            z-index: 1;
          }
          #window > div:nth-child(1)::-webkit-scrollbar {
            width: 0.8em;
          }
          #window > div:nth-child(1)::-webkit-scrollbar-track {
            background-color: #333333;
          }
          #window > div:nth-child(1)::-webkit-scrollbar-thumb {
            background-color: #ffffff;
          }
          #window > div:nth-child(1)::-webkit-scrollbar-track-piece {
            background-color: #333333;
          }
          #window > div:nth-child(2) {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: url(/static/bg_mesh_black.png);
          }
        `}</style>
      </>
    )
  }
}

export default Layout
