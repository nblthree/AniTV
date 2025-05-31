import { Component } from 'react';
import Layout from '../components/layout';

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.ipcRenderer = global.ipcRenderer;
    this.state = {
      options: []
    };

    this.handlePath = this.handlePath.bind(this);
    this.handleResolution = this.handleResolution.bind(this);
    this.handleTimeInterval = this.handleTimeInterval.bind(this);
    this.handleRunOnBoot = this.handleRunOnBoot.bind(this);
    this.reloadPath = this.reloadPath.bind(this);
    this.handleDownloadSpeedLimitChange = this.handleDownloadSpeedLimitChange.bind(this);
    this.handleUploadSpeedLimitChange = this.handleUploadSpeedLimitChange.bind(this);
  }

  async componentDidMount() {
    const options = await this.ipcRenderer.invoke('get-options');
    this.setState({ options });
    this.ipcRenderer.on('reload-path', this.reloadPath);
  }

  componentWillUnmount() {
    this.ipcRenderer.removeListener('reload-path', this.reloadPath);
  }

  reloadPath(event, val) {
    this.setState(prev => ({
      options: { ...prev.options, downloadPath: val }
    }));
  }

  handlePath() {
    this.ipcRenderer.send('set-path');
  }

  handleResolution({ target }) {
    this.ipcRenderer.send('set-resolution', target.value);
    this.setState(prev => ({
      options: { ...prev.options, resolution: target.value }
    }));
  }

  handleTimeInterval({ target }) {
    this.ipcRenderer.send('set-timeInterval', target.value);
    this.setState(prev => ({
      options: { ...prev.options, timeInterval: target.value }
    }));
  }

  handleRunOnBoot({ target }) {
    this.ipcRenderer.send('set-runOnBoot', target.value === 'true');
    this.setState(prev => ({
      options: { ...prev.options, runOnBoot: target.value === 'true' }
    }));
  }

  handleDownloadSpeedLimitChange({ target }) {
    const value = target.value === '' ? 0 : parseInt(target.value, 10);
    if (isNaN(value) || value < 0) return; // Basic validation
    this.ipcRenderer.send('set-download-speed-limit', value);
    this.setState(prev => ({
      options: { ...prev.options, downloadSpeedLimit: value }
    }));
  }

  handleUploadSpeedLimitChange({ target }) {
    const value = target.value === '' ? 0 : parseInt(target.value, 10);
    if (isNaN(value) || value < 0) return; // Basic validation
    this.ipcRenderer.send('set-upload-speed-limit', value);
    this.setState(prev => ({
      options: { ...prev.options, uploadSpeedLimit: value }
    }));
  }

  render() {
    return (
      <Layout>
        <div>
          <div className="options">
            <div className="option">
              <h3>Save files to</h3>
              <div className="flex">
                <span className="input">{this.state.options.downloadPath}</span>
                <button
                  onClick={() => {
                    this.handlePath();
                  }}
                >
                  Browse...
                </button>
              </div>
            </div>

            <div className="option">
              <h3>Video resolution</h3>
              <div className="flex">
                <select
                  onChange={this.handleResolution}
                  value={this.state.options.resolution}
                >
                  <option value="1080">1080p</option>
                  <option value="720">720p</option>
                  <option value="480">480p</option>
                </select>
              </div>
            </div>

            <div className="option">
              <h3>
                Time interval between new episodes check. (Need to relaunch the
                app)
              </h3>
              <div className="flex">
                <select
                  onChange={this.handleTimeInterval}
                  value={this.state.options.timeInterval}
                >
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="40">40 minutes</option>
                  <option value="50">50 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
            </div>

            <div className="option">
              <h3>Run on boot</h3>
              <div className="flex">
                <select
                  onChange={this.handleRunOnBoot}
                  value={
                    typeof this.state.options.runOnBoot === 'undefined'
                      ? 'false'
                      : this.state.options.runOnBoot.toString()
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="option">
              <h3>Download Speed Limit (KB/s) - 0 for unlimited</h3>
              <div className="flex">
                <input
                  type="number"
                  min="0"
                  className="speed-input"
                  value={this.state.options.downloadSpeedLimit === undefined ? '' : this.state.options.downloadSpeedLimit}
                  onChange={this.handleDownloadSpeedLimitChange}
                  placeholder="0 for unlimited"
                />
              </div>
            </div>

            <div className="option">
              <h3>Upload Speed Limit (KB/s) - 0 for unlimited</h3>
              <div className="flex">
                <input
                  type="number"
                  min="0"
                  className="speed-input"
                  value={this.state.options.uploadSpeedLimit === undefined ? '' : this.state.options.uploadSpeedLimit}
                  onChange={this.handleUploadSpeedLimitChange}
                  placeholder="0 for unlimited"
                />
              </div>
            </div>
          </div>
          <style jsx>{`
            .input {
              padding: 10px 15px 10px 10px;
              background-color: #1a1b1b;
              margin-right: 10px;
              color: #fff;
              border: 1px solid #2b2b2b;
            }
            .flex {
              display: flex;
              margin-left: 20px;
            }
            .flex button {
              height: 27px;
              outline: none;
              border: 0;
              margin: auto 0;
              background-color: #3f4142;
              color: aliceblue;
              cursor: pointer;
            }
            .option {
              padding: 20px;
            }
            option {
              font-weight: normal;
            }
            select {
              display: block;
              font-size: 16px;
              font-family: sans-serif;
              font-weight: 700;
              color: #fff;
              line-height: 1.3;
              padding: 0.3em 0.7em 0.25em 0.4em;
              min-width: 20%;
              max-width: 100%;
              box-sizing: border-box;
              margin: 0;
              border: 1px solid #2b2b2b;
              box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
              appearance: none;
              background-color: #1a1b1b;
              outline: none;
            }
            .select-css::-ms-expand {
              display: none;
            }
            .select-css:hover {
              border-color: #888;
            }
            .select-css:focus {
              border-color: #aaa;
              box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
              box-shadow: 0 0 0 3px -moz-mac-focusring;
              color: #222;
              outline: none;
            }
            .speed-input {
              padding: 0.3em 0.7em 0.25em 0.4em;
              font-size: 16px;
              font-family: sans-serif;
              font-weight: 700;
              color: #fff;
              background-color: #1a1b1b;
              border: 1px solid #2b2b2b;
              min-width: 20%;
              box-sizing: border-box;
              margin: 0;
              outline: none;
            }
            .speed-input:hover {
              border-color: #888;
            }
            .speed-input:focus {
              border-color: #aaa;
              box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}
