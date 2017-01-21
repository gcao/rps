import * as R from 'ramda'
import Move from '../Move'
import IComputerPlayer from './IComputerPlayer'

/**
 * A player that throws randomly
 */
export default class IdontcarePlayer implements IComputerPlayer {
  public predict(input: any): any {
    let probs = [Math.random(), Math.random(), Math.random()]
    let sum = R.sum(probs)
    return probs.map(prob => prob / sum)
  }

  public train(input: any, move: Move): any {
    // Do nothing
  }
}