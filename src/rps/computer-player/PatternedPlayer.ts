import GameState from '../GameState'
import Move from '../Move'
import IComputerPlayer from './IComputerPlayer'
import Prediction from './Prediction'

export default class PatternedPlayer implements IComputerPlayer {
  predict(input: GameState): Prediction {
    return null
  }

  train(input: GameState, move: Move) {
  }
}