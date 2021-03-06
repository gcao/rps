import capture from '../../common/capture'
import GameState from '../../rps/GameState'
import { addHandler, removeHandlers } from '../../handlers'
import ActionDetector from '../../rps/ActionDetector'
import { getImageClassifier } from '../../common/image-classifier'
import { getComputerPlayer } from '../../common/computer-player'
import * as actions from './actions'

export const STATE_KEY = 'home'

const ACTION_DETECTION_INTERVAL = 150
const WAIT_AFTER_PLAY_DETECTED  = 1500

let actionDetector

function startTimer(action, store) {
  setTimeout(() => {
    let { started, videoPaused } = store.getState()[STATE_KEY]
    if (!started || videoPaused) {
      return
    }

    let video  = document.querySelector('video')
    let canvas = document.querySelector('canvas')
    if (video && canvas) {
      let image = capture(video, canvas)
      store.dispatch(actions.detect(image))
    }
  }, ACTION_DETECTION_INTERVAL)
}

export function start(action, {store}) {
  let imageClassifier = getImageClassifier()
  actionDetector = new ActionDetector(imageClassifier)

  startTimer(action, store)
}

export function resume(action, {store}) {
  startTimer(action, store)
}

export function detect(action, {store}) {
  let image  = action.payload
  let result = actionDetector.detect(image)
  if (result.detected) {
    // let the AI predict and play, then train with the real human move, add to game state
    let computerPlayer = getComputerPlayer()
    let { rounds }     = store.getState()[STATE_KEY]
    let gameState      = new GameState(rounds)
    let prediction     = computerPlayer.predict(gameState)

    let humanMove    = result.imageClass
    let computerMove = prediction.winningMove

    computerPlayer.train(gameState, humanMove)

    setTimeout(() => store.dispatch(actions.play({
      player1Move: humanMove,
      player2Move: computerMove,
    })), 0)

    setTimeout(() => startTimer(action, store), WAIT_AFTER_PLAY_DETECTED)
  } else {
    startTimer(action, store)
  }
}

let handlers = []

export function registerHandlers() {
  handlers.push(addHandler(actions.START, start))
  handlers.push(addHandler(actions.RESUME, resume))
  handlers.push(addHandler(actions.DETECT, detect))
}

export function deregisterHandlers() {
  removeHandlers(handlers)
}
