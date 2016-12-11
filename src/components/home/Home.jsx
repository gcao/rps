import React, { Component } from 'react'
import { connect } from 'react-redux'

import GameState from '../../rps/GameState'
import ActionDetector from '../../rps/ActionDetector'

import capture from '../capture'
import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'
import HomeView from './HomeView'

const ACTION_DETECTION_INTERVAL = 150

class Home extends Component {
  constructor(props) {
    super(props)

    this.props.dispatch(addReducer(reducers))

    this.actionDetector = new ActionDetector()
  }

  componentWillUnmount() {
    this.props.dispatch(removeReducer(reducers))
  }

  setVideoElem = (videoElem) => {
    this.videoElem = videoElem
  }

  setCanvasElem = (canvasElem) => {
    this.canvasElem = canvasElem
  }

  start = () => {
    this.props.dispatch(actions.start())
    this._start()
  }

  restart = () => {
    this.props.dispatch(actions.restart())
  }

  _start() {
    this.timeoutRef = setTimeout(() => {
      let image = this.capture()
      this.detect(image)
    }, ACTION_DETECTION_INTERVAL)
  }

  pause = () => {
    this.props.dispatch(actions.pause())
  }

  resume = () => {
    this.props.dispatch(actions.resume())
  }

  stop = () => {
    this.props.dispatch(actions.stop())
  }

  capture() {
    return capture(this.videoElem, this.canvasElem)
  }

  detect(image) {
    let action = this.actionDetector.detect(image)
    if (action.detected) {
      this.stop()

      // let the AI predict and play, then train with the real human move, add to game state
      let gameState = new GameState(this.target.props.rounds)
      let prediction = this.computerPlayer.predict(gameState)

      let humanMove = action.imageClass
      let computerMove = prediction.myMove

      this.computerPlayer.train(gameState, humanMove)

      this.props.dispatch(
        actions.play({
          player1Move: humanMove,
          player2Move: computerMove,
        })
      )
    }

    this._start()
  }

  render() {
    return (
      <HomeView
        started={this.props.started}
        rounds={this.props.rounds}
        setVideoElem={this.setVideoElem}
        setCanvasElem={this.setCanvasElem}
        start={this.start}
        stop={this.stop}
        restart={this.restart}
        pause={this.pause}
        resume={this.resume}
      />
    )
  }
}

function mapStateToProps({rounds, home}) {
  return {
    rounds,
    ...home
  }
}

export default connect(mapStateToProps)(Home)
