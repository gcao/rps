import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './common.less'

import reducers from './reducers'

import HomePage from './pages/HomePage'
import ComputerPlayerPage from './pages/ComputerPlayerPage'
import ImageClassifierTrainingPage from './pages/ImageClassifierTrainingPage'

const initialState = {
  rounds: [],
}
let rootReducers = function(state, action) {
  let updatedState = reducers(state, action)
  return Object.assign({}, updatedState, {
    routing: routerReducer(state.routing, action),
  })
}
const store = createStore(
  rootReducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={HomePage}/>
      <Route path="/computer-player" component={ComputerPlayerPage}/>
      <Route path="/action-trainer" component={ImageClassifierTrainingPage}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
