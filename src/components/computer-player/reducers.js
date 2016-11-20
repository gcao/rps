import { ComputerPlayerProxy } from '../../rps/computer-player'
import GameState from '../../rps/GameState'

import {
  INITIALIZE,
  PLAY,
} from './actions'

var computerPlayer

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      let name = action.computerPlayer || 'DefaultComputerPlayer'

      computerPlayer = new ComputerPlayerProxy(window[name])
      return state

    case PLAY:
      var gameState = new GameState(state.rounds)
      var before = computerPlayer.predict(gameState)

      computerPlayer.train(gameState, action.move)
      var after = computerPlayer.predict(gameState)

      // Add current round to game state
      var computerMove = before.winningMove
      var rounds = state.rounds.slice()
      rounds.push([action.move, computerMove])

      return Object.assign({}, state, {
        rounds: rounds,
        prediction: {
          before: before,
          after:  after
        }
      })

    default:
      return state
  }
}

