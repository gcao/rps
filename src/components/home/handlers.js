import capture from '../../common/capture'
import GameState from '../../rps/GameState'
import { addHandler } from '../../handlers'
import ActionDetector from '../../rps/ActionDetector'
import { getImageClassifier, setImageClassifier } from '../../common/image-classifier'
import { getComputerPlayer } from '../../common/computer-player'
import * as actions from './actions'

export const STATE_KEY = 'home'

const ACTION_DETECTION_INTERVAL = 150

export default function registerHandlers() {
  let handlers = []
  let actionDetector

  handlers.push(addHandler(actions.START, (action, {store}) => {
    let imageClassifier = getImageClassifier()
    if (!imageClassifier) {
      // Use the default one
      setImageClassifier()
    }
    actionDetector = new ActionDetector(imageClassifier)

    startTimer(action, store)
  }))

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

  handlers.push(addHandler(actions.DETECT, (action, {store}) => {
    let image = store.getState().image
    let result = actionDetector.detect(image)
    if (result.detected) {
      store.dispatch(actions.stop())

      // let the AI predict and play, then train with the real human move, add to game state
      let computerPlayer = getComputerPlayer()
      let { rounds } = store.getState()[STATE_KEY]
      let gameState = new GameState(rounds)
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
  }))
}
