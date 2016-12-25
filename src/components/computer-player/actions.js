import { createAction } from 'redux-actions'
import GameState from '../../rps/GameState'
import { addHandler } from '../../handlers'
import { ComputerPlayerProxy } from '../../rps/computer-player'

export const INITIALIZE = 'computerPlayer.initialize'
export const PLAY       = 'computerPlayer.play'

export let initialize = createAction(INITIALIZE)
export let play       = createAction(PLAY)

let computerPlayer

addHandler((action, {store}) => {
  if (action.type === INITIALIZE) {
    let name = action.name || 'DefaultComputerPlayer'
    computerPlayer = new ComputerPlayerProxy(window[name])
  } else if (action.type === PLAY) {
    let move         = action.payload
    let gameState    = new GameState(store.getState().rounds)
    let before       = computerPlayer.predict(gameState)
    let computerMove = before.winningMove

    computerPlayer.train(gameState, move)
    let after = computerPlayer.predict(gameState)

    let prediction = {
      before: before,
      after:  after,
    }

    action.payload = {
      player1Move: move,
      player2Move: computerMove,
      prediction,
    }

    return action
  }
})
