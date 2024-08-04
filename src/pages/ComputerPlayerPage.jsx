import React, { Component } from 'react'
import { Header, Divider } from 'semantic-ui-react'
import Layout from '../components/Layout'
import ComputerPlayer from '../components/computer-player'

export default class ComputerPlayerPage extends Component {
  render() {
    return (
      <Layout>
        <Header>
          Play with the machine without camera
        </Header>

        <ComputerPlayer/>

        <Divider/>
      </Layout>
    )
  }
}
