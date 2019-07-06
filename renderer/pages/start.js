import { Component } from 'react'
import Layout from '../components/MyLayout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	
    }
  }

  componentDidMount() {

  }

  render() {
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
