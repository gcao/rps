import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import './common.less'

import HomePage from './pages/HomePage'
import ComputerPlayerPage from './pages/ComputerPlayerPage'
import ImageClassifierTrainingPage from './pages/ImageClassifierTrainingPage'

render(
  <Router history={hashHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/computer-player" component={ComputerPlayerPage}/>
    <Route path="/action-trainer" component={ImageClassifierTrainingPage}/>
  </Router>
  , document.getElementById('root'))
