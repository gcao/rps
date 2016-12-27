import capture from '../../common/capture'
import GameState from '../../rps/GameState'
import { addHandler } from '../../handlers'
import ActionDetector from '../../rps/ActionDetector'
import { ComputerPlayerProxy, DefaultComputerPlayer } from '../../rps/computer-player'
import * as actions from './actions'

const ACTION_DETECTION_INTERVAL = 150

let actionDetector
let computerPlayer

export let start = (action, {store}) => {
  if (action.type !== actions.START) {
    return
  }

  actionDetector = new ActionDetector()
  computerPlayer = new ComputerPlayerProxy(DefaultComputerPlayer)

  startTimer(action, store)
}
addHandler(start)

export let detect = (action, {store}) => {
  if (action.type !== actions.DETECT) {
    return
  }

  let image = store.getState().image
  let result = actionDetector.detect(image)
  if (result.detected) {
    store.dispatch(actions.stop())

    // let the AI predict and play, then train with the real human move, add to game state
    let gameState = new GameState(store.getState().rounds)
    let prediction = computerPlayer.predict(gameState)

    let humanMove = action.imageClass
    let computerMove = prediction.myMove

    computerPlayer.train(gameState, humanMove)

    store.dispatch(
      actions.play({
        player1Move: humanMove,
        player2Move: computerMove,
      })
    )
  }

  startTimer(action, store)
}
addHandler(detect)

let startTimer = (action, store) => {
  let state = store.getState()
  let started = state.home && state.home.started
  if (!started) {
    return
  }

  setTimeout(() => {
    let video = document.querySelector('video')
    let canvas = document.querySelector('canvas')
    let image = capture(video, canvas)
    store.dispatch(action.detect(image))
  }, ACTION_DETECTION_INTERVAL)
}
