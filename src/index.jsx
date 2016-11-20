import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
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
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={HomePage}/>
      <Route path="/computer-player" component={ComputerPlayerPage}/>
      <Route path="/action-trainer" component={ImageClassifierTrainingPage}/>
    </Router>
  </Provider>
  , document.getElementById('root')
)
