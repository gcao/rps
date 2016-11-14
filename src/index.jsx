import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'
import App from './App'
import { initializeComputerPlayer } from './components/computer-player'

const initialState = {
  rounds: [],
  ui: {},
}

const store = createStore(reducers, initialState)
store.dispatch(initializeComputerPlayer())

function _render() {
  render((
    <Provider store={store}>
      <App state={store.getState()}/>
    </Provider>
  ), document.getElementById('root'))
}

_render()

store.subscribe(_render)

