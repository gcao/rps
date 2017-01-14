import ComputerPlayer from './ComputerPlayer'
import Move from '../Move'
import ConvNetPlayer from './ConvNetPlayer'

export default class MainPlayer implements ComputerPlayer {
  workers: Array<ComputerPlayer>

  constructor(workers?: Array<ComputerPlayer>) {
    workers = workers || [
      new ConvNetPlayer()
    ]
    this.workers = workers
  }

  public predict(input: any): any {
    return this.workers[0].predict(input)
  }

  public train(move: Move): any {
    return this.workers[0].train(move)
  }
}