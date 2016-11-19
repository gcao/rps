import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ComputerPlayer, { initializeComputerPlayer } from '../components/computer-player'

import { ReducerGroup } from '../reducers'

class ComputerPlayerPage extends Component {
  constructor(props) {
    super(props)

    let reducers = new ReducerGroup()
    const initialState = {
      rounds: []
    }

    this.store = createStore(reducers.handle, initialState)
    this.store.dispatch(initializeComputerPlayer())
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

export default ComputerPlayerPage
