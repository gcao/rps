import Action from '../../common/Action'
import { getComputerPlayer, setComputerPlayer } from '../../common/computer-player'
import { addHandler, removeHandlers } from '../../handlers'
import GameState from '../../rps/GameState'
import * as actions from './actions'
import { STATE_KEY } from './reducers'

let handlers: Array<any> = []

export function registerHandlers() {
  handlers.push(addHandler(actions.INITIALIZE, (action: Action) => {
    setComputerPlayer(action.payload)
  }))

  handlers.push(addHandler(actions.PLAY, (action: Action, { store }: any) => {
    let computerPlayer = getComputerPlayer()
    let move = action.payload
    let rounds = store.getState()[STATE_KEY].rounds
    let gameState = new GameState(rounds)
    let before = computerPlayer.predict(gameState)
    let computerMove = before.winningMove

    computerPlayer.train(gameState, move)
    let after = computerPlayer.predict(gameState)
    let prediction = {
      before: before,
      after: after,
    }

    action.payload = {
      player1Move: move,
      player2Move: computerMove,
      prediction,
    }

    return action
  }))
}

export function deregisterHandlers() {
  removeHandlers(handlers)
}