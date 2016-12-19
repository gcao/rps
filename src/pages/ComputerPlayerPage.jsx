import React, { Component } from 'react'
import { Container, Header, Divider } from 'semantic-ui-react'
import { Link } from 'react-router'
import ComputerPlayer from '../components/computer-player'

export default class ComputerPlayerPage extends Component {
  render() {
    return (
      <Container textAlign='center'>
        <Header>Come on, let's see who is the best!</Header>
        <ComputerPlayer/>
        <Divider/>
        <p>
          <Link to='/'>Back</Link>
        </p>
      </Container>
    )
  }
}
