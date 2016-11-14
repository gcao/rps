import React, { Component } from 'react'

import ComputerPlayer from './components/computer-player'

import './App.less'

export default class App extends Component {
  render() {
    return (
      <div>
        <ComputerPlayer rounds={this.props.state.rounds}/>
      </div>
    )
  }
}

