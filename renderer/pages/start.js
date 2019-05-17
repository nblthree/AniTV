import { Component } from 'react'
import Layout from './../components/MyLayout'

export default class extends Component {
  state = {
    input: '',
    message: null
  }

  componentDidMount () {
    // start listening the channel message
    global.ipcRenderer.on('message', this.handleMessage)
  }

  componentWillUnmount () {
    // stop listening the channel message
    global.ipcRenderer.removeListener('message', this.handleMessage)
  }

  handleMessage = (event, message) => {
    // receive a message from the main process and save it in the local state
    this.setState({ message })
  }

  handleChange = event => {
    this.setState({ input: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    global.ipcRenderer.send('message', this.state.input)
    this.setState({ message: null })
  }

  render () {
    return (
      <Layout>
        <div>
       
          <style jsx>{`
            h1 {
              color: red;
              font-size: 50px;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
