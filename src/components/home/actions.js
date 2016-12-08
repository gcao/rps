import GameState from '../../rps/GameState'
import { ComputerPlayerProxy, DefaultComputerPlayer } from '../../rps/computer-player'
import ActionDetector from '../../rps/ActionDetector'

import VideoActions from '../../common/VideoActions'

export const INITIALIZE = 'home.initialize'
export const START      = 'home.start'
export const STOP       = 'home.stop'
export const PLAY       = 'home.play'
export const DESTROY    = 'home.destroy'

const ACTION_DETECTION_INTERVAL = 150

export class HomeActions {
  constructor(target) {
    this.dispatch = target.props.dispatch
    this.actionDetector = new ActionDetector()
    this.computerPlayer = new ComputerPlayerProxy(DefaultComputerPlayer)
  }

  capture() {
    if (this.videoElem && this.canvasElem) {
      let videoActions = new VideoActions(this.videoElem, this.canvasElem)
      return videoActions.capture()
    }
  }

  start() {
    this.dispatch({ type: START })
    this._start()
  }

  restart() {
  }

  pause() {
  }

  resume() {
  }

  stop() {
  }

  detect(image) {
    let action = this.actionDetector.detect(image)
    if (action.detected) {
      debugger
      this.stop()

      // let the AI predict and play, then train with the real human move, add to game state
      let gameState = new GameState(this.target.props.rounds)
      let prediction = this.computerPlayer.predict(gameState)

      let humanMove = action.imageClass
      let computerMove = prediction.myMove

      this.computerPlayer.train(gameState, humanMove)

      this.dispatch({
        type: PLAY,
        payload: {
          player1Move: humanMove,
          player2Move: computerMove,
        }
      })
    }

    this._start()
  }

  _start() {
    this.timeoutRef = setTimeout(() => {
      let image = this.capture()
      if (image) {
        this.detect(image)
      }
    }, ACTION_DETECTION_INTERVAL)
  }
}

