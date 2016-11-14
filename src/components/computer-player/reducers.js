import { ComputerPlayerProxy, DefaultComputerPlayer } from '../../rps/computer-player'

import GameState  from '../../rps/GameState'

import {
  INITIALIZE,
  PLAY,
} from './actions'

export default function reducers(state, action) {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, {
        computerPlayer: new ComputerPlayerProxy(DefaultComputerPlayer),
      })
    case PLAY:
      var gameState = new GameState(state.rounds)
      var before = state.computerPlayer.predict(gameState)

      state.computerPlayer.train(gameState, action.move)
      var after = state.computerPlayer.predict(gameState)

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

