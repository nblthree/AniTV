import Link from './link';

function MainMenu() {
  return (
    <menu id="mainMenu">
      <nav>
        <ul>
          <li>
            <Link activeClassName="is-active" href="/season">
              <a>This Season</a>
            </Link>
          </li>

          <li>
            <Link activeClassName="is-active" href="/followed">
              <a>Followed</a>
            </Link>
          </li>

          <li>
            <Link activeClassName="is-active" href="/start">
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link activeClassName="is-active" href="/watched">
              <a>Watched</a>
            </Link>
          </li>

          <li>
            <Link activeClassName="is-active" href="/options">
              <a>Options</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
          #mainMenu {
              position: relative;
              z-index: 10000;
              height: 50px;
              width: 100%;
              margin: 0;
              padding: 0;
              background-color: #000000;/*ffffff*/
              color: #f0f0f0;/*3e3e3e*/
              transition: 0.4s ease-in 0.3s;
              box-sizing: border-box;
            }

            #mainMenu nav {
              height: 100%;
              width: 100%;
              overflow: hidden;
            }

            #mainMenu ul {
              color: #a2a2a2;
              font-weight: 700;
              font-size: 18px;
              font-family: none;
              letter-spacing: 2px;
              height: 100%;
              display: flex;
              padding: 0;
              margin: 0;
              justify-content: center;
            }

            #mainMenu li {
              margin: 0px 25px 0px 25px;
              padding: 0px 0 0px 0;
              display: flex;
            }
           
            #mainMenu li a {
              color: #a2a2a2;
              padding: 0px 0px 0px 0px;
              display: block;
              margin: auto;
              outline
            }

            #mainMenu li a:hover {
              color: #efefefef;
              //border-bottom: 2px #aaaaaa solid;
            }

            #mainMenu li .is-active {
              color: #dcdcdc;
            }
      `}</style>
    </menu>
  );
}

export default MainMenu;
