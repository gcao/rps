import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Result from '../result'
import Video from '../Video'
import GameState from '../../rps/GameState'
import ActionDetector from '../../rps/ActionDetector'
import { addReducer, removeReducer } from '../../reducers'
import reducers from './reducers'
import * as actions from './actions'

const ACTION_DETECTION_INTERVAL = 150

function mapStateToProps({rounds, home, video}) {
  return {
    rounds,
    videoPaused: video && video.paused,
    ...home
  }
}

@connect(mapStateToProps)
export default class Home extends Component {
  constructor(props) {
    super(props)

    this.dispatch = props.dispatch
    this.dispatch(addReducer({reducers}))

    this.actionDetector = new ActionDetector()
  }

  componentWillUnmount() {
    this.dispatch(removeReducer({reducers}))
  }

  setVideo = (video) => {
    this.video = video
  }

  start = () => {
    this.dispatch(actions.start())
    this._start()
  }

  restart = () => {
    this.dispatch(actions.restart())
  }

  _start() {
    this.timeoutRef = setTimeout(() => {
      let image = this.video.capture()
      this.detect(image)
    }, ACTION_DETECTION_INTERVAL)
  }

  pause = () => {
    this.dispatch(actions.pause())
  }

  resume = () => {
    this.dispatch(actions.resume())
  }

  stop = () => {
    this.dispatch(actions.stop())
  }

  detect(image) {
    let action = this.actionDetector.detect(image)
    if (action.detected) {
      this.stop()

      // let the AI predict and play, then train with the real human move, add to game state
      let gameState = new GameState(this.props.rounds)
      let prediction = this.computerPlayer.predict(gameState)

      let humanMove = action.imageClass
      let computerMove = prediction.myMove

      this.computerPlayer.train(gameState, humanMove)

      this.dispatch(
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
      <div>
        { this.props.started
          ? <div>
            <p>
              <Button primary onClick={() => this.restart()}>Restart</Button>
              { !this.props.videoPaused &&
                <Button primary onClick={() => this.pause()}>Pause</Button>
              }
              { this.props.videoPaused &&
                <Button primary onClick={() => this.resume()}>Resume</Button>
              }
              <Button primary onClick={() => this.stop()}>Stop</Button>
            </p>
            <p>
              <Video paused={this.props.videoPaused} ref={this.setVideo}/>
            </p>
            <div id="training-container" style={{ display:'none' }}>
              <p>
                <img id='captured' src=""/>
              </p>
              <p id='not-recognized' style={{ display:'none' }}>Not recognized!</p>
            </div>
            <Result rounds={this.props.rounds}/>
          </div>
        : <p>
            <Button primary onClick={() => this.start()}>Play!</Button>
          </p>
        }
      </div>
    )
  }
}
