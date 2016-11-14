import React, { Component } from 'react'
import { connect } from 'react-redux'

import ComputerPlayer from './components/computer-player'

import './App.less'

class App extends Component {
  render() {
    return (
      <div>
        <ComputerPlayer
          rounds={this.props.state.rounds}
          prediction={this.props.state.prediction}
        />
      </div>
    )
  }
}

export default connect()(App)
