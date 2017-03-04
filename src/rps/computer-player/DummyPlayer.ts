import * as R from 'ramda'
import Move from '../Move'
import IComputerPlayer from './IComputerPlayer'
import Prediction from './Prediction'

/**
 * A player that throws randomly
 */
export default class DummyPlayer implements IComputerPlayer {
  public predict(input: any): any {
    let probs = [Math.random(), Math.random(), Math.random()]
    let sum = R.sum(probs)
    return new Prediction(probs.map(prob => prob / sum))
  }

  public train(input: any, move: Move): any {
    // Do nothing
  }
}