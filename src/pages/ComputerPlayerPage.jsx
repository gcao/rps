import React, { Component } from 'react'
import { Container, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router'
import ComputerPlayer from '../components/computer-player'
import Layout from '../components/Layout'

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
