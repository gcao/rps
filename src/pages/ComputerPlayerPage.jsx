import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStore } from 'redux'

import ComputerPlayer from '../components/computer-player'

import { ReducerGroup } from '../reducers'

class ComputerPlayerPage extends Component {
  constructor(props) {
    super(props)

    let reducers = new ReducerGroup()
    this.store = createStore(reducers)
  }

  render() {
    let state = this.store.getState()

    return (
      <Provider store={this.store}>
        <ComputerPlayer
          rounds={state.rounds}
          prediction={state.prediction}
        />
      </Provider>
    )
  }
}

export default connect()(ComputerPlayerPage)
