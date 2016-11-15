import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'

//import reducers from './reducers'
import HomePage from './pages/HomePage'
import ComputerPlayerPage from './pages/ComputerPlayerPage'
//import { initializeComputerPlayer } from './components/computer-player'

//const initialState = {
//  rounds: [],
//  ui: {},
//}

//const store = createStore(reducers, initialState)
//store.dispatch(initializeComputerPlayer())

//function _render() {
//  render((
//    <Provider store={this.store}>
//      <Router>
//        <Route path="/" component={HomePage}/>
//        <Route path="/computer-player" component={ComputerPlayerPage}/>
//      </Router>
//    </Provider>
//  ), document.getElementById('root'))
//}

//_render()

//store.subscribe(_render)

render((
  <Router>
    <Route path="/" component={HomePage}/>
    <Route path="/computer-player" component={ComputerPlayerPage}/>
  </Router>
), document.getElementById('root'))
