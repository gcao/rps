import React, { Component } from 'react'
import { Header, Divider } from 'semantic-ui-react'
import ComputerPlayer from '../components/computer-player'

export default class ComputerPlayerPage extends Component {
  render() {
    return (
      <div>
        <Header>
          Play with the machine without camera
        </Header>

        <ComputerPlayer/>

        <Divider/>
      </div>
    )
  }
}
