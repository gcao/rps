import GameState from '../GameState'
import Move from '../Move'
import Prediction from './Prediction'

interface IComputerPlayer {
  name: string
  predict(input: GameState): Prediction
  train(input: GameState, move: Move): void
}

export default IComputerPlayer