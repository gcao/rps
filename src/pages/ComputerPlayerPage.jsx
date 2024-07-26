import React, { Component } from 'react'
import { Container, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router'
import ComputerPlayer from '../components/computer-player'
import Layout from '../components/Layout'

export default class ComputerPlayerPage extends Component {
  render() {
    return (
      <Layout>
        <Container textAlign='center'>
          <Header>Come on, let's see who is the best!</Header>
          <p style={{fontSize: 'small'}}>
            <Link to='/'>Back</Link>
          </p>
          <ComputerPlayer/>
          <Divider/>
        </Container>
      </Layout>
    )
  }
}
