import * as R from 'ramda'
import GameState from '../GameState'
import Move from '../Move'
import IComputerPlayer from './IComputerPlayer'
import Prediction from './Prediction'

const DEFAULT_PROBABILITY = 1 / 3

export default class FirstMovePlayer implements IComputerPlayer {
  history: Array<Move> = []

  predict(input: GameState): Prediction {
    let probabilities: Array<number>

    if (this.history.length === 0) {
      probabilities = [DEFAULT_PROBABILITY, DEFAULT_PROBABILITY, DEFAULT_PROBABILITY]
    } else {
      probabilities =
        R.map(item => R.filter(R.equals(item), this.history).length / this.history.length,
          [Move.ROCK, Move.PAPER, Move.SCISSORS])
    }

    return new Prediction(probabilities)
  }

  train(input: GameState, move: Move) {
    if (input.rounds.length === 0) {
      this.history.push(move)
    }
  }
}