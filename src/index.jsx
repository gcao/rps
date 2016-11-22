import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
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
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsBlacklist: ['ADD_REDUCER', 'REMOVE_REDUCER'],
  }) ||
  compose
const store = createStore(
  rootReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
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
