import { ComputerPlayerProxy, DefaultComputerPlayer } from '../../rps/computer-player'

import {
  INITIALIZE,
  PLAY,
} from './actions'

export default function reducers(state, action) {
  switch (action.type) {
  case INITIALIZE:
    return Object.assign({}, state, {
      computerPlayer: new ComputerPlayerProxy(DefaultComputerPlayer),
      rounds: [],
    })
  case PLAY:
    //this.before = this.computerPlayer.predict(this.gameState)

    //var computerMove = this.before.winningMove
    //var result = computeResult(move, computerMove)

    //this.computerPlayer.train(this.gameState, move)
    //this.after = this.computerPlayer.predict(this.gameState)

    //// Add current round to game state
    //this.gameState.rounds.push([move, computerMove])
    return Object.assign({}, state, {
      prediction: {
        before: 'TODO',
        after:  'TODO'
      }
    })
  default:
    return state
  }
}

