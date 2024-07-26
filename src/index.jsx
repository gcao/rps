import './common.less'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ComputerPlayerPage from './pages/ComputerPlayerPage'
import ImageClassifierTrainingPage from './pages/ImageClassifierTrainingPage'

const initialState = {}
const store        = configureStore(initialState)
const history      = syncHistoryWithStore(hashHistory, store)

// Added to window for debugging purpose
window.store = store

render(
  <Provider store={store}>
    <Layout style={{backgroundColor: '#f0f0f0'}}>
      <Router history={history}>
        <Route path="/" component={HomePage}/>
        <Route path="/computer-player" component={ComputerPlayerPage}/>
        <Route path="/action-trainer" component={ImageClassifierTrainingPage}/>
      </Router>
    </Layout>
  </Provider>,
  document.getElementById('root')
)
